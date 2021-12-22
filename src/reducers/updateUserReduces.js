import produce from 'immer';
import { UPDATE_USER, UPDATE_USER_END } from '../constants/actions/update-user';

const initialState = {
  loading: false,
  userInfo: {},
  id: false
};

const update = (draft, id, userInfo) => {
  draft.loading = true;
  draft.userInfo = userInfo;
  draft.id = id;
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case UPDATE_USER: return update(draft, action.id, action.userInfo);
      case UPDATE_USER_END: return initialState;
      default: return state;
    }
  },
);