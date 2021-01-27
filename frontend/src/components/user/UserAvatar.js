import React from 'react'
import { withRouter } from 'react-router';
import CustomButton from '../../layout/button/CustomButton';
import PictureThumb from '../pictures/PictureThumb';
import "./style.css";

const UserAvatar = ({ profileImage, username, rating, history }) => (
    <div className="userAvatar">
        {profileImage && <PictureThumb imageUrl={profileImage} />}
        <span className="userAvatar__username ml-2" onClick={() => history.push(`/profile/${username}/gigs`)}>{username}</span>
        {rating &&
            <div className="userAvatar__rank">
                <CustomButton btn_class="btn-icon-text btn-star" icon="fa fa-star ">5</CustomButton>
            </div>
        }
    </div>
)

export default withRouter(UserAvatar)
