import produce from 'immer';
import { ADD_USER, ADD_USER_ERROR, ADD_USER_SUCCESS, ADD_USER_RESET } from '../constants/actions/registration';

const initialState = {
  loading: false,
  userInfo: {},
  id: false,
  error: ""
};

const add = (draft, userInfo) => {
  draft.loading = true;
  draft.userInfo = userInfo;
  return draft;
};
const addSuccess = (draft, user) => {
  draft.id = user.id;
  draft.loading = false;
  return draft;
};
const addError = (draft, e?) => {
  draft.loading = false;
  draft.error = e || "";
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case ADD_USER_RESET: return initialState;
      case ADD_USER: return add(draft, action.userInfo);
      case ADD_USER_SUCCESS: return addSuccess(draft, action.user);
      case ADD_USER_ERROR: return addError(draft, action.error);
      default: return state;
    }
  },
);