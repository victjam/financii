import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Category } from '../models/Category';

export const addCategory = async (category: Category) => {
  try {
    await addDoc(collection(firestore, 'categories'), category);
  } catch (error: any) {
    console.log('Error fetching user', error.message);
  }
};
