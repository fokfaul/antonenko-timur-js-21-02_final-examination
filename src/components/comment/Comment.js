import './Comment.css';
import { useTranslation } from 'react-i18next';

export const Comment = ({comment}) => {
    const { t } = useTranslation();
    return(
        <div className="post-comment">
            <img className="post-comment__owner__image" src={comment.owner.picture} alt={comment.owner.firstName}/>
            <p className="post-comment__owner__name">
                {t("user.title."+comment.owner.title)+". "+comment.owner.firstName+" "+comment.owner.lastName}
            </p>
            <p className="post-comment__text">{comment.message}</p>
            <p className="post-comment__data">{comment.publishDate}</p>
        </div>
    );
};

