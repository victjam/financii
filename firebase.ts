import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAoTuCRKmTAkkpbkqDK-Sujc9lAL517ajE',
  authDomain: 'financii.firebaseapp.com',
  projectId: 'financii',
  storageBucket: 'financii.appspot.com',
  messagingSenderId: '664756886645',
  appId: '1:664756886645:web:1f552ad14cc7060de5ac3c',
  measurementId: 'G-6M1T8KTKJE',
};

const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
