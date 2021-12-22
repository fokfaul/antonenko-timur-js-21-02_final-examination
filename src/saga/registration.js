import { takeEvery, put, all, call } from 'redux-saga/effects';
import { ADD_USER } from '../constants/actions/registration';
import { addUser } from '../api/ownApi';
import { addErrorAction, addSuccessAction } from '../actions/RegistrationActions';

function* addUsers(action) {
  try {
    const [apiResult] = yield all([
      call(addUser, action.userInfo,),
    ]);
    if("id" in apiResult){
        yield put(addSuccessAction(apiResult));
    } else if ('error' in apiResult) {
        yield put(addErrorAction(apiResult.error));
    }
  } catch (e) {
    yield put(addErrorAction(e.toString()));
  }
}

export default function* usersWatcher() {
  yield takeEvery(
    ADD_USER,
    addUsers,
  );
}