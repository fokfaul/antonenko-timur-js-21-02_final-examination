import './Post.css';
import {Helper} from '../../wrappers/helper/Helper';
import { useTranslation } from 'react-i18next';

export const Post = ({post, openWindow}) => {
    const { t } = useTranslation();
    return(
        <div className="post" onClick={() => {openWindow(post.id)}}>
            <Helper objId={post.owner.id}>
                <div className="post__owner">
                    <img className="post__owner__image" src={post.owner.picture} alt={post.owner.firstName}/>
                    <p className="post__owner__name">
                        {t("user.title."+post.owner.title)+". "+post.owner.firstName+" "+post.owner.lastName}
                    </p>
                    <p className="post__data">{post.publishDate}</p>
                </div>
                <img className="post__image" src={post.image} alt=""/>
                <p>{post.text}</p>
            </Helper>
        </div>
    );
};
