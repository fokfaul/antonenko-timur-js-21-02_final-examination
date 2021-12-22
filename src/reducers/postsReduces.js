import produce from 'immer';
import { LOAD_POSTS, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS } from '../constants/actions/posts';

const initialState = {
  postsList: [],
  page: 0,
  total: 0,
  limit: 6,
  loading: false,
  error: "",
  id: ""
};

const load = (draft, page?, limit?, id?) => {
  draft.loading = true;
  draft.page = page || 0;
  draft.limit = limit || 6;
  draft.id = id || "";
  return draft;
};
const loadSuccess = (draft, resp?) => {
  draft.total = resp.total;
  draft.page = resp.page || 0;
  draft.limit = resp.limit || 6;
  draft.postsList = resp.data || [];
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
      case LOAD_POSTS: return load(draft, action.page, action.limit);
      case LOAD_POSTS_SUCCESS: return loadSuccess(draft, action.postsList);
      case LOAD_POSTS_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);