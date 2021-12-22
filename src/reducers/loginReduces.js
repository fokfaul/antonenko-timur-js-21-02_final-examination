import produce from 'immer';
import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGIN_USER_RESET } from '../constants/actions/login';

const initialState = {
  loading: false,
  userInfo: {},
  id: false,
  error: ""
};

const login = (draft, id) => {
  draft.loading = true;
  draft.id = id;
  return draft;
};
const loginSuccess = (draft, resp) => {
  draft.userInfo = resp;
  draft.loading = false;
  return draft;
};
const loginError = (draft, e?) => {
  draft.loading = false;
  draft.error = e || "Ошибка входа";
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case LOGIN_USER_RESET: return initialState;
      case LOGIN_USER: return login(draft, action.id);
      case LOGIN_USER_SUCCESS: return loginSuccess(draft, action.userInfo);
      case LOGIN_USER_ERROR: return loginError(draft, action.error);
      default: return state;
    }
  },
);