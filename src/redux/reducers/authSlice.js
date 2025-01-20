import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userInfo = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {userData, userToken} =
  authSlice.actions;
export default authSlice.reducer;
