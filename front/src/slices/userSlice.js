import { createAction, createSlice } from '@reduxjs/toolkit';

import authService from '../services/localStorage/auth';

const initialState = { ...authService.getUser() };

export const setUserAction = createAction('setUser');
export const resetUserAction = createAction('resetUser');

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserAction, (state, { payload }) => {
      authService.login(payload);
      return payload;
    });
    builder.addCase(resetUserAction, (state, { payload }) => {
      authService.logout();
      return {};
    });
  },
});

export const userReducer = userSlice.reducer;
