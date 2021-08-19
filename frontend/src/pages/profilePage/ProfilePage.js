import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import PageWrapper from '../../layout/PageWrapper';
import ProfileData from './ProfileData';
import './style.css';

const ProfilePage = ({ children }) => {
    const { username } = useParams();
    const { user } = useContext(AuthContext);
    return (
        <PageWrapper mod_class="profile">
            <ProfileData logged_in_user={username === user.username}>

            </ProfileData>
        </PageWrapper>
    )
}


export default ProfilePage;

