import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { Button, Typography } from '@material-ui/core';

import withRouter from "react-router-dom/es/withRouter";

import { registryInitialValues } from '../../../../validation/Auth/initialValues';

import { registrySchema } from '../../../../validation/Auth';

import TextField from '../../../../components/TextField';

import { login, registry } from "../../actions";

const RegistryForm = ({ history }) => {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (formValues) => dispatch(registry(formValues))
      .then(() => {
        dispatch(login(formValues, history));
      }),
    [dispatch, history],
  );

  return (
    <Formik
      initialValues={registryInitialValues}
      validationSchema={registrySchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid container item spacing={2} alignItems="center" justify="center">
            <Grid item xs={12}>
              <Typography align="center" variant="h6" color="textPrimary">
                Авторизация
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField variant="outlined" name="email" label="Email" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField variant="outlined" name="name" label="Имя" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField variant="outlined" name="surname" label="Фамилия" />
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
                Регистрация
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default withRouter(RegistryForm);
