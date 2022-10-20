import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "./theme/reducers";
import thunk from 'redux-thunk';

const persistConfig = {
  key: "theme",
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: { theme: persistedReducer },
  middleware: [thunk]
})

export const persistor = persistStore(store)