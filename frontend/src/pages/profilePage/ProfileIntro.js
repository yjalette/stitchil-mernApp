import React, { useContext } from 'react';
import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';
import BoxWrapper from '../../layout/BoxWrapper';
import ProfileDesignerInfo from './ProfileDesignerInfo';
import ProfileContext from '../../context/Profile-context';

const ProfileIntro = () => {
    const { state } = useContext(ProfileContext);
    const profile = state.intro
    return (
        <>
            <BoxWrapper mod_class="profileIntro">
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
            {profile.role === "designer" && <BoxWrapper mod_class="profileIntro">
                <ProfileDesignerInfo values={profile.designer} />
            </BoxWrapper>}
        </>
    )
}

export default ProfileIntro


