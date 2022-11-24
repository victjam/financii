import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Transaction } from '../models/Transactions';

export const createTransactionDocument = async (transaction: Transaction) => {
  try {
    await addDoc(collection(firestore, 'transactions'), transaction);
  } catch (error: any) {
    console.log('Error fetching transactions', error.message);
  }
};

export const getTransactionsByUserId = async (userId: string) => {
  try {
    const transactionCollection = collection(firestore, 'transactions');
    const q = query(transactionCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];
    querySnapshot.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    return transactions;
  } catch (error: any) {
    console.log('Error fetching transactions', error.message);
  }
};

export const get5TransactionsByUserId = async (userId: string) => {
  try {
    const transactionCollection = collection(firestore, 'transactions');
    const q = query(transactionCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];
    querySnapshot.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    return transactions.slice(0, 5);
  } catch (error: any) {
    console.log('Error fetching transactions', error.message);
  }
};
