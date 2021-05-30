import { createSelector } from '@reduxjs/toolkit';

export const selectLoader = (store) => store.loader;

export const selectIsDisplayLoader = createSelector(
  selectLoader,
  ({ isDisplay }) => isDisplay,
);
