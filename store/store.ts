import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './theme/reducers';

const persistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { theme: persistedReducer },
  middleware: [thunk],
});

export const persistor = persistStore(store);
