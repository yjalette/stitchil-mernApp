import React from 'react'
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import MessageCreate from '../../components/message/MessageCreate';
import MessageData from '../../components/message/MessageData';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import CustomAlert from '../../layout/CustomAlert';
import CustomModal from '../../layout/CustomModal'
// import { CREATE_MESSAGE_MUTATION } from './graphql/mutations'

const ProfileMessage = () => {
    // const { username } = useParams();
    const [open, toggle] = useToggle(false);
    if (!open) return <CustomButton btn_class="btn-icon" icon="fa fa-envelope" btn_otherProps={{ title: "message" }} onClick={() => toggle()} />
    return (
        <CustomModal
            modal_size="md"
            modal_title="send message"
            modal_footer={(
                <>
                    <Nav.Link>go back</Nav.Link>
                    <Nav.Link>messenger</Nav.Link>
                </>
            )}
            displayWithoutBtn={true}
        >
            <MessageData></MessageData>
            {/* <MessageCreate onMessageSent={toggleSent}>
                {sent && <CustomAlert >message was sent</CustomAlert>}
            </MessageCreate> */}
        </CustomModal>
    )
}

export default ProfileMessage
