import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  AuthError
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface VolunteerData {
  uid: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  city: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface NGOData {
  id: string;
  name: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl: string;
  isApproved: boolean;
}

export interface NGOUserData {
  uid: string;
  orgName: string;
  founderName: string;
  email: string;
  mobile: string;
  location: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: Date;
  description?: string;
  imageUrl?: string;
}

export class AuthService {
  // Register new volunteer
  async registerVolunteer(
    email: string, 
    password: string, 
    volunteerData: Omit<VolunteerData, 'uid' | 'isVerified' | 'createdAt'>
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save volunteer data to Firestore
      const volunteerDoc: VolunteerData = {
        uid: user.uid,
        ...volunteerData,
        isVerified: false,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'volunteers', user.uid), volunteerDoc);

      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      const authError = error as AuthError;
      return { 
        success: false, 
        error: authError.message || 'Registration failed' 
      };
    }
  }

  // Login volunteer
  async loginVolunteer(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Login error:', error);
      const authError = error as AuthError;
      return { 
        success: false, 
        error: authError.message || 'Login failed' 
      };
    }
  }

  // Get volunteer data
  async getVolunteerData(uid: string): Promise<VolunteerData | null> {
    try {
      const docRef = doc(db, 'volunteers', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as VolunteerData;
      }
      return null;
    } catch (error) {
      console.error('Error getting volunteer data:', error);
      return null;
    }
  }

  // Get all approved NGOs
  async getApprovedNGOs(): Promise<NGOData[]> {
    try {
      const q = query(collection(db, 'ngos'), where('isApproved', '==', true));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NGOData[];
    } catch (error) {
      console.error('Error getting NGOs:', error);
      return [];
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Sign out
  async signOut(): Promise<void> {
    await auth.signOut();
  }

  // Register new NGO
  async registerNGO(
    email: string, 
    password: string, 
    ngoData: Omit<NGOUserData, 'uid' | 'isVerified' | 'isApproved' | 'createdAt'>
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save NGO data to Firestore
      const ngoDoc: NGOUserData = {
        uid: user.uid,
        ...ngoData,
        isVerified: false,
        isApproved: false,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'ngos', user.uid), ngoDoc);

      return { success: true, user };
    } catch (error) {
      console.error('NGO Registration error:', error);
      const authError = error as AuthError;
      return { 
        success: false, 
        error: authError.message || 'NGO Registration failed' 
      };
    }
  }

  // Login NGO
  async loginNGO(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('NGO Login error:', error);
      const authError = error as AuthError;
      return { 
        success: false, 
        error: authError.message || 'NGO Login failed' 
      };
    }
  }

  // Get NGO data
  async getNGOData(uid: string): Promise<NGOUserData | null> {
    try {
      const docRef = doc(db, 'ngos', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as NGOUserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting NGO data:', error);
      return null;
    }
  }

  // Update NGO profile
  async updateNGOProfile(uid: string, updates: Partial<NGOUserData>): Promise<boolean> {
    try {
      await setDoc(doc(db, 'ngos', uid), updates, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating NGO profile:', error);
      return false;
    }
  }
}

export const authService = new AuthService(); 