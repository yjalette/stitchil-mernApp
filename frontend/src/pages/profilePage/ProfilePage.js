import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import PageWrapper from '../../layout/PageWrapper';
import ProfileData from './ProfileData';
import './style.css';

const ProfilePage = () => {
    const { username, section } = useParams();
    const { user } = useContext(AuthContext);
    return (
        <PageWrapper page_class="profile">
            <ProfileData logged_in_user={username === user.username} username={username} section={section} />
        </PageWrapper>
    )
}


export default ProfilePage;

