import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = { isDisplay: false };

export const showLoaderAction = createAction('showLoader');
export const hideLoaderAction = createAction('hideLoaderAction');

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showLoaderAction, (state) => {
      state.isDisplay = true;
    });
    builder.addCase(hideLoaderAction, (state) => {
      state.isDisplay = false;
    });
  },
});

export const loaderReducer = loaderSlice.reducer;
