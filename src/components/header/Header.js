import './Header.css';
import { useHistory } from 'react-router-dom';
import {Container} from '../../wrappers/container/Container';
import Login from '../login/Login';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const moveToPage = (route) => {
        if(history.location.pathname !== route)
            history.push(route);
    }

    return (
        <header className="main-header"><Container>
            <div className="main-header__flex">
                <div className="main-header__logo">
                    <div className="main-header__logo__img"/><p>{t("title")}</p>
                </div>
                <div className="main-header__navigation">
                    <div className="main-header__navigation__users" onClick={()=>{moveToPage("/users")}}>
                        <div className="main-header__navigation__img"/><p>{t("header.users")}</p>
                    </div>
                    <div className="main-header__navigation__posts" onClick={()=>{moveToPage("/posts")}}>
                        <div className="main-header__navigation__img"/><p>{t("header.posts")}</p>
                    </div>
                </div>
                <Login/>
            </div>
        </Container></header>
    );
};
