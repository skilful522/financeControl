import { get, post, del, put } from './index';

export const createPrivateProductApi = (body) =>
  post({ url: '/privateProduct/create', body });

export const getPrivateProductsApi = () => get({ url: '/privateProduct' });

export const deletePrivateProductApi = (body) =>
  del({ url: `/privateProduct/`, body });

export const editPrivateProductApi = (body, headers) =>
  put({ url: `/privateProduct/edit`, body, headers });
