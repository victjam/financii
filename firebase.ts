import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
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

export const createUserDocument = async (user: any, additionalData: any) => {
  if (!user) return;
  const userRef = doc(firestore, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any) {
      console.log('Error creating user', error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid: any) => {
  if (!uid) return null;
  try {
    const userDocument = await getDoc(doc(firestore, 'users', uid));
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error: any) {
    console.log('Error fetching user', error.message);
  }
};
