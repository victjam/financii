import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../../models/Transactions';

type InitialState = {
  transactions: Transaction[] | null;
  transaction: Transaction | null;
  total: Number | null;
};

const initialState: InitialState = {
  transactions: null,
  transaction: null,
  total: null,
};

export const userSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    createTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    saveTotalTransactionAmount: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { createTransactions, saveTotalTransactionAmount } =
  userSlice.actions;
export default userSlice.reducer;
