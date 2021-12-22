import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import theme from '../reducers/themeReduces';
import users from '../reducers/usersReduces';
import usersWatcher from '../saga/users';
import posts from '../reducers/postsReduces';
import postsWatcher from '../saga/posts';
import comments from '../reducers/commentsReduces';
import commentsWatcher from '../saga/comments';
import postPage from '../reducers/postPageReduces';
import postPageWatcher from '../saga/post-page';
import registration from '../reducers/registrationReduces';
import registrationWatcher from '../saga/registration';
import login from '../reducers/loginReduces';
import loginWatcher from '../saga/login';
import updateUser from '../reducers/updateUserReduces';
import updateUserWatcher from '../saga/update-user';
import profile from '../reducers/profileReduces';
import profileWatcher from '../saga/profile';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(
    {
      users, posts, postPage, comments, registration, login, updateUser, theme, profile
    },
  ),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(usersWatcher);
sagaMiddleware.run(postsWatcher);
sagaMiddleware.run(postPageWatcher);
sagaMiddleware.run(commentsWatcher);
sagaMiddleware.run(registrationWatcher);
sagaMiddleware.run(loginWatcher);
sagaMiddleware.run(updateUserWatcher);
sagaMiddleware.run(profileWatcher);

export default store;