import React, { useContext } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import GroupButton from '../../layout/buttons/GroupButton';
import ClickButton from '../../layout/buttons/ClickButton';
import { useToggle } from '../../custom_hooks/useToggle';

// import UserMessage from './UserMessage';
import ProfileImage from './ProfileImage';
import ProfileContext from '../../context/Profile-context';

const ProfileHeader = ({ profile }) => {
    const { push } = useHistory();
    const { logged_in_user } = useContext(ProfileContext)
    const [showChat, toggleChat] = useToggle();

    const handleMessage = () => {
        if (logged_in_user) push('/messenger');
        else toggleChat();
    }

    return (
        <Card className="profileHeader">
            <ProfileImage src={profile && profile.coverImage} image_type="coverImage" />
            <Container className="profileHeader__box">
                <Container className="profileHeader__col justify-content-center">
                    <ProfileImage src={profile && profile.profileImage} image_type="profileImage" />
                    <h3 className="profileHeader__title">{profile.fullname} </h3>
                </Container>
                <GroupButton group_class="profileHeader__col justify-content-end">
                    {!logged_in_user &&
                        <>
                            <ClickButton title="follow" />
                            {/* <UserMessage /> */}
                            {/* <ClickButton title="message" onClick={handleMessage} /> */}
                            {/* {showChat && <CreateChat />} */}
                        </>
                    }
                </GroupButton>
            </Container>
        </Card>

    )
}

export default ProfileHeader
