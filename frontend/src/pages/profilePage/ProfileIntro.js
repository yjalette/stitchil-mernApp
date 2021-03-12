import React from 'react';
import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';
import BoxWrapper from '../../layout/BoxWrapper';
import ProfileDesignerInfo from './ProfileDesignerInfo';

const ProfileIntro = ({ profile }) => profile ? (
    <>
        <BoxWrapper className="profileIntro">
            <SectionHeader title={`About ${profile.username}`} />
            <div className="profileIntro__content">
                <ListItem icon="fas fa-user" content={profile.username} />
                {/* <ListItem icon="fa fa-eye" content={profile.lastSeen} /> */}
                <ListItem icon="fas fa-briefcase" content={profile.role} />
                <ListItem icon="fas fa-home" content={profile.country} item_class="profileIntro-country" />
                <ListItem icon="fas fa-globe" content={profile.languages} item_class="profileIntro-lang" />
                <ListItem field="about"
                    content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`}
                    maxWords={80} />
            </div>
        </BoxWrapper>
        {profile.role === "designer" && <BoxWrapper className="profileIntro">
            <ProfileDesignerInfo values={profile.designer} />
        </BoxWrapper>}
    </>
) : null
export default ProfileIntro


