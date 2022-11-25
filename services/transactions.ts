import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Transaction } from '../models/Transactions';

export const createAndGetTransactionsAmount = async (
  transaction: Transaction,
) => {
  await addDoc(collection(firestore, 'transactions'), transaction);
  const transactions: Transaction[] = [];
  const q = query(
    collection(firestore, 'transactions'),
    where('userId', '==', transaction.userId),
  );
  const querySnapshot = await getDocs(q);
  const totalAmount = querySnapshot.docs.reduce(
    (acc, doc) =>
      doc.data().type === 'income'
        ? acc + doc.data().amount
        : acc - doc.data().amount,
    0,
  );
  const transactionsData = querySnapshot.forEach(doc => {
    return transactions.push({ id: doc.id, ...doc.data() } as Transaction);
  });
  console.log(transactionsData);
  return { totalAmount, transactionsData };
};

export const createTransactionDocument = async (transaction: Transaction) => {
  try {
    await addDoc(collection(firestore, 'transactions'), transaction);
  } catch (error: any) {
    console.log('Error fetching transactions', error.message);
  }
};

export const getTransactionsByUserId = async (userId: string) => {
  const transactionCollection = collection(firestore, 'transactions');
  const q = query(transactionCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const transactions: Transaction[] = [];
  querySnapshot.forEach(doc => {
    transactions.push({ id: doc.id, ...doc.data() } as Transaction);
  });
  const transactionsData = getTransactionsByUser(userId, transactions);
  const totalAmount = transactionsData.reduce(
    (acc, doc) => (doc.type === 'income' ? acc + doc.amount : acc - doc.amount),
    0,
  );
  return {
    totalAmount,
    transactionsData,
  };
};

const getTransactionsByUser = (userId: string, transactions: Transaction[]) =>
  transactions.filter(transaction => transaction.userId === userId);

export const get5TransactionsByUserId = async (userId: string) => {
  try {
    const transactionCollection = collection(firestore, 'transactions');
    const q = query(transactionCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];
    querySnapshot.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    return getTransactionsByUser(userId, transactions.slice(0, 5));
  } catch (error: any) {
    console.log('Error fetching transactions', error.message);
  }
};
