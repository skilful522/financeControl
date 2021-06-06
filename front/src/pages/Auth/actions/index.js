import {
  registry as registryApi,
  login as loginApi,
} from '../../../services/api/auth';

import { showNotification } from '../../../actions/notification';
import { setUserAction } from '../../../slices/userSlice';
import { NOTIFICATION_TYPES } from "../../../constants";

export const registry = (formValues) => (dispatch) =>
  registryApi(formValues)
    .then(({ message }) =>
      dispatch(
        showNotification({
          text: message,
          type: NOTIFICATION_TYPES.success,
        }),
      ),
    )
    .catch(({ response: { data: { message } } }) =>
      dispatch(
        showNotification({
          text: message,
          type: NOTIFICATION_TYPES.error,
        }),
      ),
    );

export const login = (formValues, history) => (dispatch) =>
  loginApi(formValues)
    .then((user) => {
      dispatch(setUserAction(user));
      dispatch(
        showNotification({
          text: 'Вы успешно зашли в систему',
          type: NOTIFICATION_TYPES.success,
        }),
      );
      history.push('/');
    })
    .catch(({ response: { data: { message } } }) =>
      dispatch(
        showNotification({
          text: message,
          type: NOTIFICATION_TYPES.error,
        }),
      ),
    );
