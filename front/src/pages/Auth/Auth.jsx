import React from 'react';

import { useAuthStyles } from './useAuthStyles';
import RegistryForm from './components/RegistryForm/RegistryForm';
import LoginForm from './components/LoginForm';

const Auth = () => {
  const classes = useAuthStyles();

  return (
    <div className={classes.root}>
      <div className={classes.formsWrapper}>
        <div className={classes.form}>
          <LoginForm />
        </div>
        <div className={classes.form}>
          <RegistryForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
