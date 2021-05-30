import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';

import Notification from './components/Notification';
import { Routes } from './Routes';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <Notification />
  </Provider>
);

export default App;
