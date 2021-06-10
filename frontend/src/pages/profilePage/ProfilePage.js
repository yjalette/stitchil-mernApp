import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import ProfileContext from '../../context/Profile-context';
import PageWrapper from '../../layout/PageWrapper';
import ProfileData from './ProfileData';
import './style.css';

const ProfilePage = ({ children }) => {
    const { username } = useParams();
    const { user } = useContext(AuthContext);
    return (
        <PageWrapper page_class="profile">
            <ProfileContext.Provider value={{ logged_in_user: username === user.username }}>
                {/* <ProfileData /> */}
                {children}
            </ProfileContext.Provider>
        </PageWrapper>
    )
}


export default ProfilePage;

