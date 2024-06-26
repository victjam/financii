import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
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

export const deleteCategory = async (id: string) => {
  try {
    await updateDoc(doc(firestore, 'custom_categories', id), {
      isDeleted: true,
    });
  } catch (error: any) {
    console.log('Error deleting category', error.message);
  }
};

export const updateCategory = async (id: string, category: Category) => {
  try {
    await updateDoc(doc(firestore, 'custom_categories', id), category);
  } catch (error: any) {
    console.log('Error updating category', error.message);
  }
};

export const addCategory = async (category: Category) => {
  try {
    await addDoc(collection(firestore, 'custom_categories'), category);
  } catch (error: any) {
    console.log('Error fetching categories', error.message);
  }
};

export const getCategories = async () => {
  try {
    const publicCategories = await getDocs(collection(firestore, 'categories'));
    const customCategories = await getDocs(
      collection(firestore, 'custom_categories'),
    );
    const categories: Category[] = [];
    publicCategories.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() } as Category);
    });
    if (customCategories.empty) return categories;
    customCategories.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() } as Category);
    });
    return categories;
  } catch (error: any) {
    console.log('Error fetching categories', error.message);
  }
};
