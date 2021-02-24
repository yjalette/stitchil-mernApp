import React from 'react'
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import MessageCreate from '../../components/message/MessageCreate';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomAlert from '../../layout/CustomAlert';
import CustomModal from '../../layout/CustomModal'
import { CREATE_MESSAGE_MUTATION } from './graphql/mutations'

const ProfileMessage = () => {
    const { username } = useParams();
    const [sent, toggleSent] = useToggle(false);

    return (
        <CustomModal
            btn_class="btn-icon fa fa-envelope"
            btn_otherProps={{ title: "message" }}
            modal_size="md"
            modal_title="send message"
            modal_footer={(
                <>
                    <Nav.Link>go back</Nav.Link>
                    <Nav.Link>messenger</Nav.Link>
                </>
            )}
            timeOut={sent && "2000"}
        >
            <MessageCreate
                query={CREATE_MESSAGE_MUTATION}
                onMessageSent={toggleSent}
                otherVariables={{ recipient: username }} >
                {sent && <CustomAlert >message was sent</CustomAlert>}
            </MessageCreate>
        </CustomModal>
    )
}

export default ProfileMessage
