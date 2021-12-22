import './Profile.css';
import {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAction, resetAction } from '../../actions/ProfileActions';
import { updateAction } from '../../actions/UpdateUserActions';
import {Container} from '../../wrappers/container/Container';
import {WinLoader} from '../../windows/loader/WinLoader';
import {ProfilePost} from '../../components/profile-post/ProfilePost';
import {ArrowNav} from '../../components/arrow_nav/ArrowNav';
import {EditProfile} from '../../windows/edit-profile/EditProfile';
import { useTranslation } from 'react-i18next';

import useScrollToTop from "../../hooks/useScrollToTop";

const Profile = ({loginId, user, postsList, page, total, loading, limit, error, reset,
        load, updateStatus, updateUser, resetLogin}) => {
    useScrollToTop();
    const { t } = useTranslation();
    const params = useParams();
    const history = useHistory();
    const limitView = 2;
    const [displayEdit, setDisplayEdit] = useState(false);
    const closeEditWindow = () => {setDisplayEdit(false)};
    const [counter, setCounter] = useState(1);
    const getNewPosts = (p) => load(user.id, p, limit);
    useEffect(() => {
        if(error)
        {
            alert(error);
            reset();
            history.push("/users");
        }
    }, [error]);
    const nextPosts = () => {
        if((counter+1)*limitView>limit)
        {
            setCounter(1);
            getNewPosts(page+1);
        }
        else
            setCounter(counter+1);
    };
    const previousPosts = () => {
        if(counter>1)
           setCounter(counter-1);
        else
        {
           setCounter(limit/limitView);
           getNewPosts(page-1);
        }
    };
    useEffect(() => {
        if(params.id)
            load(params.id, page, limit);
        else
            history.push("/users");
    }, [params]);
    return(
        <section className="profile"><Container>
            {error ? "" : !loading ?
            <div className="profile__interface">
                <div className="profile__user">
                    <img className="profile__user__img" src={user.picture} alt={user.id}/>
                    <div className="profile__user__info">
                        <h2 className="profile__user__name">
                            {t("user.title."+user.title)+". "+user.firstName+" "+user.lastName}
                        </h2>
                        <p className="profile__user__gender"><b>{t("user.gender")}:</b> {t("user."+user.gender)}</p>
                        <p className="profile__user__birth">
                            <b>{t("user.birth")}:</b> {user.dateOfBirthView}
                        </p>
                        <p className="profile__user__register">
                            <b>{t("user.reg")}:</b> {user.registerDate}
                        </p>
                        <p className="profile__user__phone"><b>{t("user.phone")}:</b> {user.phone}</p>
                        <p className="profile__user__email"><b>{t("user.email")}:</b> {user.email}</p>
                        <p className="profile__user__id"><b>ID:</b> {user.id}</p>
                    </div>
                    {loginId === user.id?
                    <div className="profile__user__edit">
                        <div className="profile__user__edit__button" onClick={()=>{setDisplayEdit(true);}}>
                            <div className="profile__user__edit__img"/><p>{t("user.edit")}</p>
                        </div>
                    </div>
                    : ""}
                </div>
                <div className="profile__posts">
                  {loading? <WinLoader/> :
                      <div className="profile__posts__view">
                        {
                            (total/limitView>1 && (counter!==1 || page!==0)) ?
                                <ArrowNav mode="reverse" moveToPage={previousPosts}/> : ""
                        }
                        <div className="profile__posts__list">
                          {postsList ? postsList.slice((counter-1)*limitView, counter*limitView).map((elem, index) => (
                            <ProfilePost post={elem} key={index}/>
                          )) : ""}
                        </div>
                        {
                            (total/limitView>1 && (page*limit+(counter+1)*limitView) <= total) ?
                                <ArrowNav moveToPage={nextPosts}/> : ""
                        }
                      </div>
                  }
                </div>
            </div>
            : <WinLoader/>}
            {updateStatus? <WinLoader/> : displayEdit?
                <EditProfile user={user} closeWindow={closeEditWindow} saveChange={updateUser}/>
            : ""}
        </Container></section>
    );
};

export default connect(
  (state) => ({
    loginId: state.login.id,
    postsList: state.profile.postsList,
    total: state.profile.total,
    page: state.profile.page,
    loading: state.profile.loading,
    limit: state.profile.limit,
    error: state.profile.error,
    user: state.profile.userInfo,
    updateStatus: state.updateUser.loading
  }),
  (dispatch) => ({
    load: bindActionCreators(loadAction, dispatch),
    reset: bindActionCreators(resetAction, dispatch),
    updateUser: bindActionCreators(updateAction, dispatch),
  }),
)(Profile);