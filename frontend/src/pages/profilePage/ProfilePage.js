import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../../context/Auth-context';
import PageWrapper from '../../layout/PageWrapper';
import ProfileData from './ProfileData';

import './style.css';

const ProfilePage = () => {
    const { username, section } = useParams();
    const [activeSection, setActiveSection] = useState(section)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (section) setActiveSection(section);
    }, [section]);

    return (
        <PageWrapper page_class="profile">
            <ProfileData logged_in_user={username === user.username} username={username} activeSection={activeSection} />
        </PageWrapper>
    )
}


export default ProfilePage;

