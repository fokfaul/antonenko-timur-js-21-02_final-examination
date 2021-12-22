import './Footer.css';
import {Container} from '../../wrappers/container/Container';
import DarkTheme from '../darktheme/DarkTheme';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18next.changeLanguage(language);
        window.location.reload();
    };
    return (
        <footer className="main-footer"><Container>
            <div className="footer__copyright">{t("title")} &copy; 2021</div>
            <div className="footer__locate">
                <div className="footer__locate__ru" onClick={() => handleChangeLanguage("ru")}/>
                <div className="footer__locate__en" onClick={() => handleChangeLanguage("en")}/>
            </div>
            <DarkTheme/>
        </Container></footer>
    );
};