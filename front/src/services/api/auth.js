import { post } from './index';

export const registry = (body) => post({ url: '/auth/register', body });

export const login = (body) => post({ url: '/auth/login', body });
