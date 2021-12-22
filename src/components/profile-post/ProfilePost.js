import './ProfilePost.css';

export const ProfilePost = ({post}) => {
    return(
        <div className="profile-post">
            <img className="profile-post__image" src={post.image} alt=""/>
            <p>{post.text}</p>
        </div>
    );
};
