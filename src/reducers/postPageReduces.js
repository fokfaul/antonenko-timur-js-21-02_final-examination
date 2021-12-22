import produce from 'immer';
import { LOAD_POST_PAGE, LOAD_POST_PAGE_ERROR, LOAD_POST_PAGE_SUCCESS } from '../constants/actions/post-page';

const initialState = {
  id: false,
  loading: true,
  error: "",
  postInfo: {}
};

const load = (draft, id) => {
  draft.loading = true;
  draft.id = id;
  return draft;
};
const loadSuccess = (draft, resp) => {
  draft.postInfo = resp;
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
      case LOAD_POST_PAGE: return load(draft, action.id);
      case LOAD_POST_PAGE_SUCCESS: return loadSuccess(draft, action.postInfo);
      case LOAD_POST_PAGE_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);