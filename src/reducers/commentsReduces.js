import produce from 'immer';
import { LOAD_COMMENTS, LOAD_COMMENTS_ERROR, LOAD_COMMENTS_SUCCESS } from '../constants/actions/comments';

const initialState = {
  commentsList: [],
  page: 0,
  total: 0,
  limit: 20,
  loading: false,
  error: "",
};

const load = (draft, id, page?, limit?) => {
  draft.loading = true;
  draft.page = id;
  draft.page = page || 0;
  draft.limit = limit || 20;
  return draft;
};
const loadSuccess = (draft, resp?) => {
  draft.total = resp.total;
  draft.page = resp.page || 0;
  draft.limit = resp.limit || 20;
  draft.commentsList = resp.data || [];
  draft.loading = false;
  return draft;
};
const loadError = (draft, e?) => {
  draft.loading = false;
  draft.error = e || "";
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case LOAD_COMMENTS: return load(draft, action.id, action.page, action.limit);
      case LOAD_COMMENTS_SUCCESS: return loadSuccess(draft, action.commentsList);
      case LOAD_COMMENTS_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);