import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  darkThemeEnabled: boolean;
};

const initialState: InitialState = {
  darkThemeEnabled: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkTheme: state => {
      state.darkThemeEnabled = !state.darkThemeEnabled;
    },
  },
});

export const { toggleDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
