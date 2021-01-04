import React from 'react'
import { useHistory } from 'react-router-dom';

import StarButton from '../../layout/buttons/StarButton';
import Thumbnail from '../../layout/media/Thumbnail';



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
                    <StarButton count="5" />
                </div>
            }
        </>
    )
}

export default UserAvatar
