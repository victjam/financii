import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cardSlice from './features/card/cardSlice';
import loaderSlice from './features/loader/loaderSlice';
import themeSlice from './features/theme/themeSlice';
import transactionsSlice from './features/transactions/transactionsSlice';
import userSlice from './features/user/userSlice';

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};
const cardPersistConfig = {
  key: 'card',
  storage: AsyncStorage,
};
const transactionPersistConfig = {
  key: 'transaction',
  storage: AsyncStorage,
};

const themePersist = persistReducer(themePersistConfig, themeSlice);
const userPersist = persistReducer(userPersistConfig, userSlice);
const cardPersist = persistReducer(cardPersistConfig, cardSlice);
const transactionsPersist = persistReducer(
  transactionPersistConfig,
  transactionsSlice,
);
export const store = configureStore({
  reducer: {
    user: userPersist,
    theme: themePersist,
    loader: loaderSlice,
    card: cardPersist,
    transactions: transactionsPersist,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
