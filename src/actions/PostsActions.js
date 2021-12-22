import { LOAD_POSTS, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS } from '../constants/actions/posts';

export const loadAction = (page?, limit?, id?) => ({
  type: LOAD_POSTS,
  page: page,
  limit: limit,
  id: id
});

export const loadSuccessAction = (posts) => ({
  type: LOAD_POSTS_SUCCESS,
  postsList: posts,
});

export const loadErrorAction = (e) => ({
  type: LOAD_POSTS_ERROR,
  error: e,
});