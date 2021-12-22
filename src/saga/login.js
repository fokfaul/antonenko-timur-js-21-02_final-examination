import { takeEvery, put, all, call } from 'redux-saga/effects';
import { LOGIN_USER } from '../constants/actions/login';
import { getUserById } from '../api/ownApi';
import { loginErrorAction, loginSuccessAction } from '../actions/LoginActions';

function* loginUser(action) {
  try {
    const [apiResult] = yield all([
      call(getUserById, action.id,),
    ]);
    if("id" in apiResult){
        yield put(loginSuccessAction(apiResult));
    } else if ('error' in apiResult) {
        yield put(loginErrorAction(apiResult.error));
    }
  } catch (e) {
    yield put(loginErrorAction(e.toString()));
  }
}

export default function* loginWatcher() {
  yield takeEvery(
    LOGIN_USER,
    loginUser,
  );
}