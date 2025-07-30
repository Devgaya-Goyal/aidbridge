import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc0H1EIaZzS9NsfZ-1DZ57pVhkVMCKZOM",
  authDomain: "aidbridge-3ad6b.firebaseapp.com",
  projectId: "aidbridge-3ad6b",
  storageBucket: "aidbridge-3ad6b.firebasestorage.app",
  messagingSenderId: "328486681463",
  appId: "1:328486681463:web:5711004c450d787e687f72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Log Firestore initialization
console.log('Firestore initialized for project:', firebaseConfig.projectId);

export default app; 