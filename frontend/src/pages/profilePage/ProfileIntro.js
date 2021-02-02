import React from 'react';

import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader';
import BoxWrapper from '../../layout/BoxWrapper';
import DesignerSum from './proflleDesigner/DesignerSum';

const ProfileIntro = ({ profile }) => {

    return (
        <>   {profile &&
            <BoxWrapper>
                <SectionHeader title={`About ${profile.username}`} />
                <div className="profileSection__content">
                    <ListItem imageUrl="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/icons/username-icon_ajmegx.svg" content={profile.username} />
                    <ListItem imageUrl="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/icons/role-icon_hrlek5.svg" content={profile.role} />
                    <ListItem imageUrl="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/icons/house-icon_oxkixc.svg" content={`lives in ${profile.country || ""}`} />
                    <ListItem imageUrl="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093309/icons/language-icon_jwvll4.svg" content={`speaks ${profile.language || "English"}`} />
                    <ListItem imageUrl="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/icons/info-icon_bj05ca.svg" content={`Hardcore coffee nerd. Twitter fanatic. Professional internet trailblazer. Introvert. Communicator. Problem solver.`} maxWords="30" />
                </div>
            </BoxWrapper>
            //  profile.portfolio && <BoxWrapper>
            //         <DesignerSum values={profile.portfolio} />
            //     </BoxWrapper>
        }
        </>
    )
}


export default ProfileIntro
