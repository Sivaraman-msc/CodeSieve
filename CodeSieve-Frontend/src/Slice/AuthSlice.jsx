import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SignUpData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const { login, logout, SignUpData } = authSlice.actions;
export default authSlice.reducer;
