import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Transaction } from '../models/Transactions';

export const createAndGetTransactionsAmount = async (
  transaction: Transaction,
) => {
  await addDoc(collection(firestore, 'transactions'), transaction);
  const { transactionsData, totalAmount } = await getTransactionsByUserId(
    transaction.userId,
  );
  return {
    transactionsData,
    totalAmount,
  };
};

export const deleteTransaction = async (id: string, userId: string) => {
  const docRef = doc(firestore, 'transactions', id);
  await deleteDoc(docRef);
  const { transactionsData, totalAmount } = await getTransactionsByUserId(
    userId,
  );
  return {
    transactionsData,
    totalAmount,
  };
};

export const updateTransaction = async (transaction: Transaction) => {
  await updateDoc(
    doc(firestore, 'transactions', transaction.id ?? '1'),
    transaction,
  );
  const { transactionsData, totalAmount } = await getTransactionsByUserId(
    transaction.userId,
  );
  return {
    transactionsData,
    totalAmount,
  };
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

  return {
    totalAmount: totalAmount(transactionsData),
    transactionsData,
  };
};

const getTransactionsByUser = (userId: string, transactions: Transaction[]) =>
  transactions.filter(transaction => transaction.userId === userId);

const totalAmount = (transactions: Transaction[]) =>
  transactions.reduce(
    (acc, doc) => (doc.type === 'income' ? acc + doc.amount : acc - doc.amount),
    0,
  );
