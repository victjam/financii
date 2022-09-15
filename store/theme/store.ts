import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";
const localStorageKey = "theme";
const persistedTheme = localStorage.getItem(localStorageKey);

let initialState = {
  theme: persistedTheme ? JSON.parse(persistedTheme) : {},
};

const store = configureStore({
  reducer: {
    theme: rootReducer,
  },
  preloadedState: initialState,
})
store.subscribe(() => {
  const preferences = store.getState().theme
  if (!preferences) return;

  localStorage.setItem(localStorageKey, JSON.stringify(preferences));
});

export default store;