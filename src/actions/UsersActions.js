import { LOAD_USERS, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS } from '../constants/actions/users';

export const loadAction = (page?, limit?) => ({
  type: LOAD_USERS,
  page: page,
  limit: limit
});

export const loadSuccessAction = (users) => ({
  type: LOAD_USERS_SUCCESS,
  usersList: users,
});

export const loadErrorAction = (e) => ({
  type: LOAD_USERS_ERROR,
  error: e,
});