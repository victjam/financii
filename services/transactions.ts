import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Transaction } from '../models/Transactions';

export const createAndGetTransactionsAmount = async (
  transaction: Transaction,
) => {
  await addDoc(collection(firestore, 'transactions'), transaction);
  const q = query(
    collection(firestore, 'transactions'),
    where('userId', '==', transaction.userId),
  );
  const querySnapshot = await getDocs(q);
  const total = querySnapshot.docs.reduce(
    (acc, doc) =>
      doc.data().type === 'income'
        ? acc + doc.data().amount
        : acc - doc.data().amount,
    0,
  );
  return total;
};

export const createTransactionDocument = async (transaction: Transaction) => {
  try {
    const tra = await addDoc(
      collection(firestore, 'transactions'),
      transaction,
    );
    console.log(tra);
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
