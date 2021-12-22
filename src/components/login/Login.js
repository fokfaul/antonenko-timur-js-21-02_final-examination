import './Login.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loginAction, resetAction } from '../../actions/LoginActions';
import { useTranslation } from 'react-i18next';

const Login = ({id, user, login, logout, error}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [idUser, setIdUser] = useState("");
    useEffect(() => {
        if(id)
        {
            localStorage.setItem('idUser', id);
            setIdUser(id);
        }
        else if(localStorage.getItem("idUser")){
            login(localStorage.getItem("idUser"));
        }
    }, [id]);
    useEffect(() => {
        if(error)
        {
            logoutUser();
            alert(error);
        }
    }, [error]);
    const moveToPage = (route) => {
        if(history.location.pathname !== route)
            history.push(route);
    }
    const logoutUser = () => {
        localStorage.setItem('idUser', "");
        setIdUser("");
        logout();
        history.push("/");
    }

    return (
        <div>
            { idUser?
                <div className="user-login">
                    <div className="user-login__info">
                        <img className="user-login__img" src={user.picture} alt={user.id}/>
                        <p onClick={()=>{moveToPage("/profile/"+user.id)}}>{user.firstName}</p>
                    </div>
                    <p onClick={logoutUser}>{t("login.exit")}</p>
                </div>
                :
                <div className="user-login">
                    <p onClick={()=>{moveToPage("/login")}}>{t("login.enter")}</p>
                    <p onClick={()=>{moveToPage("/registration")}}>{t("login.reg")}</p>
                </div>
            }
        </div>
    );
};

export default connect(
    (state) => ({
        id: state.login.id,
        user: state.login.userInfo,
        error: state.login.error,
    }),
    (dispatch) => ({
        login: bindActionCreators(loginAction, dispatch),
        logout: bindActionCreators(resetAction, dispatch),
    }),
)(Login);