import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: state => {
      state.user = null;
    },
  },
});

export const { createUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
