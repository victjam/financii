import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isLoaderEnabled: boolean;
};

const initialState: InitialState = {
  isLoaderEnabled: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader: state => {
      state.isLoaderEnabled = !state.isLoaderEnabled;
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
