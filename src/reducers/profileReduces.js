import produce from 'immer';
import { GET_PROFILE, GET_PROFILE_RESET, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR } from '../constants/actions/profile';

const initialState = {
  loading: true,
  userInfo: {},
  postsList: {},
  id: false,
  limit: 10,
  page: 0,
  total: 0,
  error: ""
};

const get = (draft, id, limit, page) => {
  draft.loading = true;
  draft.id = id;
  draft.limit = limit || 10;
  draft.page = page || 0;
  return draft;
};
const getSuccess = (draft, userInfo, postsList) => {
  draft.userInfo = userInfo;
  draft.postsList = postsList.data;
  draft.total = postsList.total;
  draft.page = postsList.page || 0;
  draft.limit = postsList.limit || 10;
  draft.loading = false;
  return draft;
};
const getError = (draft, e?) => {
  draft.loading = false;
  draft.error = e || "Не удалось получить информацию о пользователе";
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case GET_PROFILE_RESET: return initialState;
      case GET_PROFILE: return get(draft, action.id, action.limit, action.page);
      case GET_PROFILE_SUCCESS: return getSuccess(draft, action.userInfo, action.postsList);
      case GET_PROFILE_ERROR: return getError(draft, action.error);
      default: return state;
    }
  },
);