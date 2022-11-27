import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Category } from '../models/Category';

export const getCategory = async (id: string) => {
  try {
    const document = await getDoc(doc(firestore, 'categories', id));
    if (document.exists()) {
      return { id: document.id, ...document.data() } as Category;
    }
  } catch (error: any) {
    console.log('Error fetching category', error.message);
  }
};

export const addCategory = async (category: Category) => {
  try {
    await addDoc(collection(firestore, 'categories'), category);
  } catch (error: any) {
    console.log('Error fetching categories', error.message);
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'categories'));
    const categories: Category[] = [];
    querySnapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() } as Category);
    });
    return categories;
  } catch (error: any) {
    console.log('Error fetching categories', error.message);
  }
};
