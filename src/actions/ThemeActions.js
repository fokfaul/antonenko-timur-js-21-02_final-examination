import { CHANGE_THEME, RESET_THEME } from '../constants/actions/theme';

export const changeAction = (theme) => ({
  type: CHANGE_THEME,
  theme: theme,
});

export const resetAction = () => ({
  type: RESET_THEME,
});
