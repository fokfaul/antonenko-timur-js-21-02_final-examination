import { GET_PROFILE, GET_PROFILE_RESET, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR } from '../constants/actions/profile';

export const loadAction = (id, page?, limit?) => ({
  type: GET_PROFILE,
  id: id,
  page: page,
  limit: limit
});

export const loadSuccessAction = (user, postsList) => ({
  type: GET_PROFILE_SUCCESS,
  userInfo: user,
  postsList: postsList
});

export const loadErrorAction = (e) => ({
  type: GET_PROFILE_ERROR,
  error: e,
});

export const resetAction = () => ({
  type: GET_PROFILE_RESET,
});
