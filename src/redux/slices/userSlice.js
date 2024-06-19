import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  user: {
    name: '',
    photoURL: '',
    login:'',
    logout:'',
    role: 'none',
    token: '',
    login_location: '',
    loginDay: '',
    loginTime:'',
    logoutTime:'',
    logoutDay: ''
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialUserState,
  reducers: {
    signIn: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = true;
    },
    signOut: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      state.user = { name: action.name, photoURL: action.photoURL };
    },
  },
});

export const { signIn, signOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
