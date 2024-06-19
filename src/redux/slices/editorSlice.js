import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  user: {  },
  editing: false,
  date:new Date()  
};

const userSlice = createSlice({
  name: 'userSlice',
  initialUserState,
  reducers: {
    signIn: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = true;
    },
    signOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
