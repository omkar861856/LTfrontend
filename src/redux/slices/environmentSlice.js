// environmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProduction: false, // default to development
};

const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setEnvironment(state, action) {
      state.isProduction = action.payload;
    },
  },
});

export const { setEnvironment } = environmentSlice.actions;
export default environmentSlice.reducer;
