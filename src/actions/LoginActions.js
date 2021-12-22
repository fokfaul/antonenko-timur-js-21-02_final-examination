import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGIN_USER_RESET } from '../constants/actions/login';

export const loginAction = (id) => ({
  type: LOGIN_USER,
  id: id
});

export const resetAction = () => ({
  type: LOGIN_USER_RESET,
});

export const loginSuccessAction = (userInfo) => ({
  type: LOGIN_USER_SUCCESS,
  userInfo: userInfo,
});

export const loginErrorAction = (e) => ({
  type: LOGIN_USER_ERROR,
  error: e,
});