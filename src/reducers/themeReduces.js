import produce from 'immer';
import { CHANGE_THEME, RESET_THEME } from '../constants/actions/theme';

const initialState = {
  theme: "",
};

const change = (draft, theme) => {
  draft.theme = theme;
  return draft;
};

export default (state = initialState, action) => produce(
  state,
  (draft) => {
    switch (action.type) {
      case CHANGE_THEME: return change(draft, action.theme);
      case RESET_THEME: return initialState;
      default: return state;
    }
  },
);