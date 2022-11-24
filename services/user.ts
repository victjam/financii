import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

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
