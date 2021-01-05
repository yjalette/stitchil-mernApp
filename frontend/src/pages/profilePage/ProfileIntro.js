import React from 'react';
import { Container } from 'react-bootstrap';

import DesignerData from '../../components/profileDesigner/DesignerData';
import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';

const ProfileIntro = ({ profile }) => {
    const { role, country, username, language } = profile;
    return (
        <>
            <Container className="userSum profileSection">
                <SectionHeader title={`About ${username}`} />
                <Container className="profileSection__content">
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/username-icon_ajmegx.svg" content={username} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/role-icon_hrlek5.svg" content={role} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/house-icon_oxkixc.svg" content={`lives in ${country}`} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/language-icon_jwvll4.svg" content={`speaks ${language || "English"}`} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/info-icon_bj05ca.svg" content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`} maxWords="30" />
                </Container>
            </Container>
            {profile && profile.portfolio && <DesignerData portfolioId={profile.portfolio} />}
        </>
    )
}


export default ProfileIntro
