import { UPDATE_USER, UPDATE_USER_END } from '../constants/actions/update-user';

export const updateAction = (id, userInfo) => ({
  type: UPDATE_USER,
  userInfo: userInfo,
  id: id
});

export const updateEndAction = () => ({
  type: UPDATE_USER_END,
});
