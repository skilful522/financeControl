import { get, post, put } from "./index";

export const addProductImageApi = (body) =>
  post({ url: '/productImage/add', body });

export const editProductImageApi = (body) =>
  put({ url: '/productImage/edit', body });

export const getProductImageApi = productId => get({ url: `/productImage/${productId}` });
