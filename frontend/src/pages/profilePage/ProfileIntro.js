import React from 'react';
import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';
import BoxWrapper from '../../layout/BoxWrapper';
import ProfileDesignerInfo from './ProfileDesignerInfo';

const ProfileIntro = ({ profile }) => (
    <>
        <BoxWrapper>
            <SectionHeader title={`About ${profile.username}`} />
            <div className="profileSection__content">
                <ListItem icon="fa fa-user" content={profile.username} />
                {/* <ListItem icon="fa fa-eye" content={profile.lastSeen} /> */}
                <ListItem icon="fa fa-briefcase" content={profile.role} />
                <ListItem icon="fa fa-home" content={`lives in ${profile.country || ""}`} />
                <ListItem icon="fa fa-globe" content={`speaks ${profile.language || "English"}`} />
                <ListItem field="about" content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`} maxWords={80} />
            </div>
        </BoxWrapper>
        {profile.role === "designer" && <BoxWrapper>
            <ProfileDesignerInfo values={profile.designer} />
        </BoxWrapper>}
    </>
)
export default ProfileIntro


