import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import withRouter from 'react-router-dom/es/withRouter';

import TextField from '../../../../components/TextField';

import { loginInitialValues } from '../../../../validation/Auth/initialValues';
import { loginSchema } from '../../../../validation/Auth';
import { login } from '../../actions';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (formValues) => {
      dispatch(login(formValues, history));
    },
    [dispatch, history],
  );

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid container item spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} sm={8}>
              <TextField variant="outlined" name="email" label="Email" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                type="password"
                name="password"
                label="Пароль"
              />
            </Grid>
            <Grid container justify="center" item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default withRouter(LoginForm);
