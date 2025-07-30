import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface VolunteerData {
  name: string;
  email: string;
  mobile: string;
  location: string;
  city: string;
  isVerified: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  volunteerData: VolunteerData | null;
  loading: boolean;
  signUp: (email: string, password: string, volunteerData: Omit<VolunteerData, 'isVerified'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateVolunteerData: (data: Partial<VolunteerData>) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [volunteerData, setVolunteerData] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch volunteer data from Firestore
        try {
          const volunteerDoc = await getDoc(doc(db, 'volunteers', user.uid));
          if (volunteerDoc.exists()) {
            setVolunteerData(volunteerDoc.data() as VolunteerData);
          }
        } catch (error) {
          console.error('Error fetching volunteer data:', error);
        }
      } else {
        setVolunteerData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, volunteerData: Omit<VolunteerData, 'isVerified'>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: volunteerData.name
      });

      // Send verification email
      await sendEmailVerification(user);

      // Save volunteer data to Firestore
      const volunteerDoc = {
        ...volunteerData,
        isVerified: false
      };

      await setDoc(doc(db, 'volunteers', user.uid), volunteerDoc);
      setVolunteerData(volunteerDoc);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const updateVolunteerData = async (data: Partial<VolunteerData>) => {
    if (!currentUser) return;

    try {
      const updatedData = { ...volunteerData, ...data };
      await setDoc(doc(db, 'volunteers', currentUser.uid), updatedData, { merge: true });
      setVolunteerData(updatedData as VolunteerData);
    } catch (error) {
      console.error('Error updating volunteer data:', error);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (!currentUser) return;

    try {
      await sendEmailVerification(currentUser);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    volunteerData,
    loading,
    signUp,
    login,
    logout,
    updateVolunteerData,
    sendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 