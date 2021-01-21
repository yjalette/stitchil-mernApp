import React from 'react'
import { useHistory } from 'react-router-dom';
import CustomButton from '../button/CustomButton';
import Thumbnail from './Thumbnail';

const UserAvatar = ({ profileImage, username, rating }) => {
    const { push } = useHistory();
    const handleClick = () => push(`/profile/${username}/gigs`)
    return (
        <>
            <div className="flex-center user-avatar" onClick={handleClick}>
                <Thumbnail imageUrl={profileImage} />
                <span className="username ml-2" >{username}</span>
            </div>
            {rating &&
                <div className="rank">
                    <CustomButton btn_class="btn-icon-text btn-star" icon="fa fa-star ">5</CustomButton>
                </div>
            }
        </>
    )
}

export default UserAvatar
