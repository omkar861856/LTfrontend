import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enquirys: []
};

const enquirysSlice = createSlice({
  name: 'enquirysSlice',
  initialState,
  reducers: {
    feedEnquirys: (state, action) => {
      console.log('enquiry feeding started')
      state.enquirys = action.payload
      console.log(action.payload)
    },    
  },
});

export const { feedEnquirys } = enquirysSlice.actions;
export default enquirysSlice.reducer;
