import { LOAD_COMMENTS, LOAD_COMMENTS_ERROR, LOAD_COMMENTS_SUCCESS } from '../constants/actions/comments';

export const loadAction = (id, page?, limit?) => ({
  type: LOAD_COMMENTS,
  id: id,
  page: page,
  limit: limit
});

export const loadSuccessAction = (comments) => ({
  type: LOAD_COMMENTS_SUCCESS,
  commentsList: comments,
});

export const loadErrorAction = (e) => ({
  type: LOAD_COMMENTS_ERROR,
  error: e,
});