import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../../models/Card';

type InitialState = {
  cards: Card[] | null;
  card: Card | null;
};

const initialState: InitialState = {
  cards: null,
  card: null,
};

export const cardSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    createCards: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { createCards } = cardSlice.actions;
export default cardSlice.reducer;
