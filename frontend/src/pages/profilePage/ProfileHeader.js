import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import ProfileContext from '../../context/Profile-context';
import GroupButton from '../../layout/button/GroupButton';
import ProfileMessage from './ProfileMessage';
import DemoVersionAlert from '../../layout/alerts/DemoVersionAlert';

const ProfileHeader = ({ coverImage, profileImage, fullname }) => {
    const { logged_in_user } = useContext(ProfileContext);

    return (
        <section className="profileHeader">
            <ProfileImage src={coverImage} image_type="coverImage" />
            <Container className="profileHeader__overlay">
                <ProfileImage src={profileImage} image_type="profileImage" />
                <h2 className="profileHeader__title">{fullname} </h2>
            </Container>
            <GroupButton group_class="profileHeader__buttons">
                {!logged_in_user && <ProfileMessage />}
                <DemoVersionAlert btn_props={{ btn_class: "ml-2 btn-click", btn_title: "follow" }} />
            </GroupButton>
        </section>

    )
}

export default ProfileHeader
