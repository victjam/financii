import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Transaction } from '../models/Transactions';

export const createTransactionDocument = async (transaction: Transaction) => {
  await addDoc(collection(firestore, 'transactions'), transaction);
};
