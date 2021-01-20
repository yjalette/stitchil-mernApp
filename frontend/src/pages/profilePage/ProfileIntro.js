import React from 'react';
import { Container } from 'react-bootstrap';

import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';
import SectionWrapper from '../../layout/SectionWrapper';
import DesignerSum from './proflleDesigner/DesignerSum';

const ProfileIntro = ({ profile }) => {
    const { role, country, username, language } = profile;
    return (
        <>
            <SectionWrapper>
                <SectionHeader title={`About ${username}`} />
                <Container className="profileSection__content">
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/username-icon_ajmegx.svg" content={username} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/role-icon_hrlek5.svg" content={role} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/house-icon_oxkixc.svg" content={`lives in ${country}`} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/Icons/language-icon_jwvll4.svg" content={`speaks ${language || "English"}`} />
                    <ListItem icon="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/info-icon_bj05ca.svg" content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`} maxWords="30" />
                </Container>
            </SectionWrapper>
            {profile && profile.portfolio && <SectionWrapper>
                <DesignerSum values={profile.portfolio} />
            </SectionWrapper>}
        </>
    )
}


export default ProfileIntro
