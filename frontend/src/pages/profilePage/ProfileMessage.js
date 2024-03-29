import React from 'react'
import { useHistory, useParams } from 'react-router';
import UserSendMessage from '../../components/user/UserSendMessage';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import CustomModal from '../../layout/CustomModal'

const ProfileMessage = () => {
    const { username } = useParams()
    const [open, toggle] = useToggle(false);
    const { push } = useHistory();

    return (
        <UserSendMessage to_username={username} />
    )


    // <CustomButton
    // btn_class="btn-icon"
    // icon="fas fa-envelope"
    // btn_otherProps={{ title: "message" }}
    // onClick={() => push(`/messages/${username}`)} />

    // return (
    //     <CustomModal
    //         modal_size="md"
    //         modal_title="send message"
    //         modal_class="profileChat"
    //         displayWithoutBtn={true}
    //         onClose={() => toggle()}
    //     >
    //         <ChatMessageSend member={username} />
    //     </CustomModal>
    // )
}

export default ProfileMessage
