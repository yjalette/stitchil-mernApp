import React, { useContext } from 'react'
import { Container, Image } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import ProfileContext from '../../context/Profile-context';
import GroupButton from '../../layout/button/GroupButton';
import ProfileMessage from './ProfileMessage';
import PictureFlag from '../../components/pictures/PictureFlag';
import CustomButton from '../../layout/button/CustomButton';
import CustomPopover from '../../layout/CustomPopover';
import messages from "../../constants/messages";

const defaultImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg"

const ProfileHeader = () => {
    const { state, logged_in_user } = useContext(ProfileContext);
    const { coverImage, profileImage, fullname, country } = state.intro
    if (!logged_in_user) {
        return (
            <>
                <Image src={coverImage || defaultImg} className="coverImage" />
                <Container className="profileHeader__content profileImage-wrapper">
                    <Container className="profileHeader__overlay">
                        <Image src={profileImage || defaultImg} className="profileImage" />
                    </Container>
                    <Container className="profileHeader__rightCol">
                        <h2 className="profileHeader__title">{fullname} {country && <PictureFlag country={country[0]} />}</h2>
                    </Container>
                </Container>
                <GroupButton group_class="profileHeader__buttons">
                    <ProfileMessage />
                    <CustomPopover content={messages.demo} trigger="click" popover_class="customPopover-warning">
                        <CustomButton btn_class="ml-3 btn-icon fas fa-user-plus" btn_otherProps={{ title: "follow" }} />
                    </CustomPopover>
                </GroupButton>

            </>
        )
    }

    return (
        <>
            <ProfileImage src={coverImage} image_type="coverImage" />
            <Container className="profileHeader__content">
                <Container className="profileHeader__overlay p-img ">
                    <ProfileImage src={profileImage} image_type="profileImage" />
                </Container>
                <Container className="profileHeader__rightCol">
                    <h2 className="profileHeader__title">{fullname} {country && <PictureFlag country={country[0]} />}</h2>
                </Container>
            </Container>
        </>



    )
}

export default ProfileHeader
