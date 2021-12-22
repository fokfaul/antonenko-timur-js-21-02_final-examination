import './Registration.css';
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container} from '../../wrappers/container/Container';
import {WinLoader} from '../../windows/loader/WinLoader';
import {UserForm} from '../../components/user-form/UserForm';
import { addAction, resetAction } from '../../actions/RegistrationActions';
import { loginAction } from '../../actions/LoginActions';
import { useTranslation } from 'react-i18next';

const Registration = ({loading, id, addUser, error, resetState, login}) => {
    const history = useHistory();
    const { t } = useTranslation();
    useEffect(() => {
        if(id)
        {
            localStorage.setItem('idUser', id);
            login(id);
            history.push("/profile/" + id);
            resetState();
            return;
        }
        if(error)
        {
            resetState();
            alert(error);
        }
    }, [id, error]);

  return (
    <section className="registration"><Container>
        {loading? <WinLoader/> : ""}
        <h2>{t("userForm.title")}</h2>
        <UserForm callback={addUser}/>
    </Container></section>
  );
};

export default connect(
  (state) => ({
    loading: state.registration.loading,
    id: state.registration.id,
    error: state.registration.error,
  }),
  (dispatch) => ({
    addUser: bindActionCreators(addAction, dispatch),
    resetState: bindActionCreators(resetAction, dispatch),
    login: bindActionCreators(loginAction, dispatch),
  }),
)(Registration);