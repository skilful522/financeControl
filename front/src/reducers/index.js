import { combineReducers } from 'redux';

import { userReducer } from '../slices/userSlice';

import { loaderReducer } from '../slices/loaderSlice';

import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  loader: loaderReducer,
});

export default rootReducer;
