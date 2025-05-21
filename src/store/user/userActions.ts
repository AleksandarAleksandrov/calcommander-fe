import { createApiThunk } from "../thunkApiFactory";

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `[API]${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `[API]${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `[API]${LOGIN}_FAILURE`;

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginAction = createApiThunk(LOGIN, '/login', 'POST');