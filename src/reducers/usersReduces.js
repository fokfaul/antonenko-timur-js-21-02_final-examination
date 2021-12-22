import produce from 'immer';
import { LOAD_USERS, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS } from '../constants/actions/users';

const initialState = {
  usersList: [],
  page: 0,
  total: 0,
  limit: 6,
  paging: [],
  loading: false,
  error: "",
};

const load = (draft, page?, limit?) => {
  draft.loading = true;
  draft.page = page || 0;
  draft.limit = limit || 10;
  return draft;
};
const loadSuccess = (draft, resp?) => {
  draft.total = resp.total;
  draft.page = resp.page || 0;
  draft.limit = resp.limit || 10;
  draft.usersList = resp.data || [];
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
      case LOAD_USERS: return load(draft, action.page, action.limit);
      case LOAD_USERS_SUCCESS: return loadSuccess(draft, action.usersList);
      case LOAD_USERS_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);