import React, { useContext } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useToggle } from '../../custom_hooks/useToggle';
import ProfileImage from './ProfileImage';
import ProfileContext from '../../context/Profile-context';

const ProfileHeader = ({ profile }) => {
    const { push } = useHistory();
    const { logged_in_user } = useContext(ProfileContext)
    const [showChat, toggleChat] = useToggle();

    const handleMessage = () => {
        if (logged_in_user) push('/messenger');
        else toggleChat();
    }

    return (
        <div className="profileHeader">
            <ProfileImage src={profile && profile.coverImage} image_type="coverImage" />
            <div className="profileHeader__col">
                <ProfileImage src={profile && profile.profileImage} image_type="profileImage" />
                <h2 className="profileHeader__title">{profile.fullname}{profile.rating} </h2>
            </div>
        </div>

    )
}

export default ProfileHeader
