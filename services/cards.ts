import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';

export const getCardByUserIdWithQuery = async (userId: string) => {
  const cardRef = collection(firestore, 'cards');
  const q = query(cardRef, where('userId', '==', userId));
  const cardSnapshot = await getDocs(q);
  const cardData: any = [];
  cardSnapshot.forEach(doc => {
    cardData.push({ id: doc.id, ...doc.data() });
  });
  return cardData;
};

export const addCard = async (card: any) => {
  await addDoc(collection(firestore, 'cards'), card);
  const cardData = await getCardByUserIdWithQuery(card.userId);
  return cardData;
};
