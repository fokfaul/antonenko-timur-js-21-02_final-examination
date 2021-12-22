import './EditProfile.css';
import {Window} from '../../wrappers/window/Window';
import {UserForm} from '../../components/user-form/UserForm';
import {defaultAvatar} from '../../constants/api/common';
import {Loader} from '../../components/loader/Loader';
import {useState} from 'react';

export const EditProfile = ({user, closeWindow, saveChange}) => {
    const [avatar, setAvatar] = useState(false);
    const [loader, setLoader] = useState(false);
    const uploadImg = (input) => {
        if(!loader){
            setLoader(true);
            const reader = new FileReader();
            reader.readAsDataURL(input.target.files[0]);
            input.target.value = "";
            reader.onload = () => {
                const formData = new FormData();
                formData.set('key', '6e6c7fdbede63ac17e6e2cf92bfac563');
                formData.set('image', reader.result.replace(/^.*,/, ''));
                fetch('https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    body: formData
                }).then((resp) => resp.json())
                  .then((resp) => {setAvatar(resp.data.display_url); setLoader(false);})
                  .catch((e) => alert(e.toString()))
            }
        }
    }
    const finishEdit = (userObj) => {
        userObj.picture = avatar? avatar : user.picture;
        saveChange(user.id, userObj);
        closeWindow();
    }
    return(
        <Window>
            <div className="profile-window">
                <div className="profile-window-close" onClick={closeWindow}/>
                <div className="profile-window__user-info">
                    <img className="profile-window__user-img" src={avatar? avatar : user.picture} alt={user.id}/>
                    {loader? <Loader/> :
                        <div className="profile-window__edit-img">
                            <label onClick={()=>{setAvatar(defaultAvatar)}}>Удалить фото</label>
                            <form>
                                <label htmlFor="photo">Обновить фото</label>
                                <input onChange={uploadImg} type="file" name="avatar" id="photo" accept="image/*"/>
                            </form>
                        </div>
                    }
                </div>
                <UserForm callback={finishEdit} mini={true} user={user}/>
            </div>
        </Window>
    );
};
