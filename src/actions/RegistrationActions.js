import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, ADD_USER_RESET } from '../constants/actions/registration';

export const addAction = (userInfo) => ({
  type: ADD_USER,
  userInfo: userInfo
});

export const resetAction = () => ({
  type: ADD_USER_RESET,
});

export const addSuccessAction = (user) => ({
  type: ADD_USER_SUCCESS,
  user: user,
});

export const addErrorAction = (e) => ({
  type: ADD_USER_ERROR,
  error: e,
});