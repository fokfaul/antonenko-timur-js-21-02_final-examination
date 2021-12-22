import './Login.css';
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Button } from 'antd';
import {Container} from '../../wrappers/container/Container';
import {Loader} from '../../components/loader/Loader';
import { loginAction, resetAction } from '../../actions/LoginActions';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const validateMessages = {
    required: "${label} is required!",
    pattern: {
        mismatch: "поле неверно заполнено",
    }
};

const Login = ({loading, id, login, error, resetState}) => {
    const { t } = useTranslation();
    const history = useHistory();
    useEffect(() => {
        if(id)
        {
            history.push("/users");
            return;
        }
        if(error)
        {
            resetState();
            alert(error);
        }
    }, [id, error]);

  const onFinish = (form) => login(form.ID);

  return (
    <section className="login"><Container>
        {loading? <Loader/> : ""}
        <h2>{t("userForm.login")}</h2>
        <Form {...layout} name="login__form" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name='ID' label="ID" rules={[{
            required: true,
            pattern: "^[A-Za-z0-9]{2,50}$"
          }]}>
            <Input placeholder={t("userForm.placeholder.id")} />
          </Form.Item>
          <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              {t("userForm.enter")}
            </Button>
          </Form.Item>
        </Form>
        <p className="login__registration" onClick={()=>{history.push("/registration")}}>
            {t("userForm.helper.reg")}
        </p>
    </Container></section>
  );
};

export default connect(
  (state) => ({
    loading: state.login.loading,
    id: state.login.id,
    error: state.registration.error,
  }),
  (dispatch) => ({
    login: bindActionCreators(loginAction, dispatch),
    resetState: bindActionCreators(resetAction, dispatch),
  }),
)(Login);