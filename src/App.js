import './App.css';
import { connect } from 'react-redux';
import {Header} from './components/header/Header';
import {Footer} from './components/footer/Footer';
import Users from './forms/users/Users';
import Posts from './forms/posts/Posts';
import Registration from './forms/registration/Registration';
import Login from './forms/login/Login';
import Profile from './forms/profile/Profile';
import './locale/i18next';

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom';

const App = ({theme}) => {
  return (
    <HashRouter>
        <div className="App" id={theme}>
            <Header/>
            <div className="app-content">
                <Switch>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/posts">
                        <Posts/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/profile/:id">
                        <Profile/>
                    </Route>
                    <Redirect from="/" to="/users"/>
                </Switch>
            </div>
            <Footer/>
        </div>
    </HashRouter>
  );
}

export default connect(
  (state) => ({
    theme: state.theme.theme
  }),
)(App);
