import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/notification';

export const initialState = {
  isDisplay: false,
  type: 'info',
  text: '',
};

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        isDisplay: true,
        ...action.payload,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        isDisplay: false,
      };
    default:
      return state;
  }
}
