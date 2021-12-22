import { takeEvery, put, all, call } from 'redux-saga/effects';
import { LOAD_COMMENTS } from '../constants/actions/comments';
import { getCommentsList } from '../api/ownApi';
import { loadErrorAction, loadSuccessAction } from '../actions/CommentsActions';

function* loadComments(action) {
  try {
    const [apiResult] = yield all([
      call(
        getCommentsList,
        action.id,
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

export default function* commentsWatcher() {
  yield takeEvery(
    LOAD_COMMENTS,
    loadComments,
  );
}