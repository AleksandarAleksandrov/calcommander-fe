import { createApiThunk } from "../thunkApiFactory";

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `${LOGIN}_FAILURE`;

export const loginAction = createApiThunk(LOGIN, '/login', 'POST');