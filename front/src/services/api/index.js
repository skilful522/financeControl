import axios from 'axios';
import Qs from 'qs';

import authService from '../localStorage/auth';

import store from '../../store';
import { resetUserAction } from '../../slices/userSlice';

const BASE_URL = '/api';

const NOT_AUTH = 'Нет авторизации';

const handleError = (error) => {
  if (error.response.data.message === NOT_AUTH) {
    store.dispatch(resetUserAction());
    return;
  }

  throw error;
};

export const get = ({
  url,
  params = {},
  auth = true,
  responseType = 'json',
}) => {
  const myAxios = axios.create({
    paramsSerializer: (data) =>
      Qs.stringify(data, { arrayFormat: 'repeat', skipNulls: true }),
  });
  const user = authService.getUser();
  const headers = {};
  const token = user?.token;

  if (auth && token) {
    headers.Authorization = `${token}`;
  }

  return myAxios
    .get(`${BASE_URL}${url}`, { params, headers, responseType })
    .then(({ data }) => data)
    .catch((error) => handleError(error));
};

export const post = ({ url, params = {}, auth = true, body = {} }) => {
  const headers = {};

  const user = authService.getUser();
  const token = user?.token;

  if (auth && token) {
    headers.Authorization = `${token}`;
  }

  return axios({
    method: 'post',
    url: `${BASE_URL}${url}`,
    data: body,
    params,
    headers,
  })
    .then(({ data }) => data)
    .catch((error) => handleError(error));
};

export const del = ({ url, params = {}, auth = true, body = {} }) => {
  const headers = {};

  const user = authService.getUser();
  const token = user?.token;

  if (auth && token) {
    headers.Authorization = `${token}`;
  }

  return axios({
    method: 'delete',
    url: `${BASE_URL}${url}`,
    data: body,
    params,
    headers,
  })
    .then(({ data }) => data)
    .catch((error) => handleError(error));
};

export const put = ({ url, params = {}, auth = true, body = {}, headers = {} }) => {
  const user = authService.getUser();
  const token = user?.token;

  if (auth && token) {
    headers.Authorization = `${token}`;
  }

  return axios({
    method: 'put',
    url: `${BASE_URL}${url}`,
    data: body,
    params,
    headers,
  })
    .then(({ data }) => data)
    .catch((error) => handleError(error));
};
