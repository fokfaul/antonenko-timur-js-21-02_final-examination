import { LOAD_POST_PAGE, LOAD_POST_PAGE_ERROR, LOAD_POST_PAGE_SUCCESS } from '../constants/actions/post-page';

export const loadAction = (id) => ({
  type: LOAD_POST_PAGE,
  id: id
});

export const loadSuccessAction = (postInfo) => ({
  type: LOAD_POST_PAGE_SUCCESS,
  postInfo: postInfo,
});

export const loadErrorAction = (e) => ({
  type: LOAD_POST_PAGE_ERROR,
  error: e,
});