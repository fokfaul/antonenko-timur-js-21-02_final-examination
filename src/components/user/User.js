import './User.css';
import {Helper} from '../../wrappers/helper/Helper';
import { Link } from 'react-router-dom';

export const User = ({userId, imgUrl, name}) => {
    return(
        <Link to={`/profile/${userId}`}>
            <div className="user">
                <Helper objId={userId}>
                    <img src={imgUrl} alt={name}/>
                    <p>{name}</p>
                </Helper>
            </div>
        </Link>
    );
};
