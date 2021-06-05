import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { selectNotification } from '../../selectors/selectNotification';

import { hideNotification } from '../../actions/notification';

const Notification = () => {
  const dispatch = useDispatch();
  const { isDisplay, type, text } = useSelector(selectNotification);

  const handleClose = useCallback(() => dispatch(hideNotification()), []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isDisplay}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
