import React from 'react';
import { Container } from 'react-bootstrap';

import "./style.css"
import ListItem from '../../layout/ListItem';
import ProfileSectionTitle from '../../pages/profilePage/ProfileSectionTitle';

const UserSum = ({ profile }) => {
    const { role, country, username, language } = profile;
    return (
        <Container className="userSum profileSection">
            <ProfileSectionTitle title={`About ${username}`} />
            <Container className="profileSection__content">
                <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/username-icon_ajmegx.svg" content={username} />
                <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/role-icon_hrlek5.svg" content={role} />
                <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/house-icon_oxkixc.svg" content={`lives in ${country}`} />
                <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/language-icon_jwvll4.svg" content={`speaks ${language || "English"}`} />
                <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/info-icon_bj05ca.svg" content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`} maxWords="30" />
            </Container>
        </Container>
    )
}


export default UserSum
