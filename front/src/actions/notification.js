export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const showNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload,
});

export const hideNotification = () => ({ type: HIDE_NOTIFICATION });
