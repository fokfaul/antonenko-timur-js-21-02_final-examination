import { takeEvery, put, all, call } from 'redux-saga/effects';
import { UPDATE_USER } from '../constants/actions/update-user';
import { updateUser } from '../api/ownApi';
import { updateEndAction } from '../actions/UpdateUserActions';
import { loginErrorAction, loginSuccessAction } from '../actions/LoginActions';
import { loadAction } from '../actions/ProfileActions';

function* update(action) {
  try {
    const [apiResult] = yield all([
      call(updateUser, action.id, action.userInfo,),
    ]);
    if("id" in apiResult){
        yield all([
            put(updateEndAction()),
            put(loginSuccessAction(apiResult)),
            put(loadAction(apiResult.id, 0, 10))
        ]);
    } else if ('error' in apiResult) {
        yield all([
            put(updateEndAction()),
            put(loginErrorAction(apiResult.error))
        ]);
    }
  } catch (e) {
    yield all([
        put(updateEndAction()),
        put(loginErrorAction(e.toString()))
    ]);
  }
}

export default function* updateUserWatcher() {
  yield takeEvery(
    UPDATE_USER,
    update,
  );
}