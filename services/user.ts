import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { User } from '../models/User';

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

export const onChangeEmailWithAuth = async (id: string, userData: any) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      if (userData.email) {
        await updateEmail(user, userData.email);
      }
      if (userData.password) {
        await updatePassword(user, userData.password);
      }
      await updateDoc(doc(firestore, 'users', id), {
        ...removeUseless(userData),
      });
    } catch (error: any) {
      alert(
        "Please logout and login again to update your email and password. If you're still having problems, please contact us.",
      );
    }
    return getUserDocument(id);
  }
};

export const updateUser = async (user: User) => {
  console.log(removeUseless(user));
  const userRef = doc(firestore, 'users', user.uid);
  try {
    await updateDoc(userRef, removeUseless(user));
  } catch (error: any) {
    console.log('Error updating user', error.message);
  }
  await getUserDocument(user.uid);
};

export const onChangePasswordWithAuth = async (password: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      await user?.updatePassword(password);
      console.log('Password updated');
    } catch (error: any) {
      console.log('Error updating email', error.message);
    }
  }
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

const removeUseless = (user: any) => {
  const { uid, password, id, ...rest } = user;
  return rest;
};
