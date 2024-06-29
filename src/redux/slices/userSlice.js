import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  initialState,
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
      state.user = { ...state.user, name: action.payload.name ,photoURL: action.payload.photoURL };
    },
  },
});

export const { signIn, signOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
