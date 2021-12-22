import { takeEvery, put, all, call } from 'redux-saga/effects';
import { LOAD_USERS } from '../constants/actions/users';
import { getUsersList } from '../api/ownApi';
import { loadErrorAction, loadSuccessAction } from '../actions/UsersActions';

function* loadUsers(action) {
  try {
    const [apiResult] = yield all([
      call(
        getUsersList,
        action.page,
        action.limit,
      ),
    ]);
    if('error' in apiResult)
        yield put(loadErrorAction(apiResult.error));
    else
        yield put(loadSuccessAction(apiResult));
  } catch (e) {
    yield put(loadErrorAction(e.toString()));
  }
}

export default function* usersWatcher() {
  yield takeEvery(
    LOAD_USERS,
    loadUsers,
  );
}