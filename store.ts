import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import loaderSlice from './features/loader/loaderSlice';
import themeSlice from './features/theme/themeSlice';
import userSlice from './features/user/userSlice';

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};
const themePersist = persistReducer(themePersistConfig, themeSlice);
const userPersist = persistReducer(userPersistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: userPersist,
    theme: themePersist,
    loader: loaderSlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
