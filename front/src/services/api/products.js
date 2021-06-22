import { get } from "./index";

export const getProductsApi = () => get({ url: '/products' });

export const getProduct = id => get({ url: `/products/${id}` });
