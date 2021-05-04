import React from 'react'
import { useParams } from 'react-router';
import ChatMessageSend from '../../components/chat/ChatMessageSend';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import CustomModal from '../../layout/CustomModal'

const ProfileMessage = () => {
    const { username } = useParams()
    const [open, toggle] = useToggle(false);

    if (!open) return <CustomButton
        btn_class="btn-icon"
        icon="fas fa-envelope"
        btn_otherProps={{ title: "message" }}
        onClick={() => toggle()} />

    return (
        <CustomModal
            modal_size="md"
            modal_title="send message"
            modal_class="profileChat"
            displayWithoutBtn={true}
            onClose={() => toggle()}
        >
            <ChatMessageSend member={username} />
        </CustomModal>
    )
}

export default ProfileMessage
