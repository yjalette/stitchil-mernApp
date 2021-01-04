import React, { useState } from 'react';
import { withRouter, useParams } from "react-router";
import { Link } from 'react-router-dom';

import usePostData from '../../custom_hooks/usePostData';
import CustomModal from '../../layout/CustomModal';
import { useToggle } from '../../custom_hooks/useToggle';
import MessageForm from '../message/MessageForm';
import AlertTimer from '../../layout/alerts/AlertTimer';
import { Modal } from 'react-bootstrap';

const UserMessage = () => {
    const { username } = useParams();
    const [message, setMessage] = useState("")
    const [isSent, setIsSent] = useToggle(false)
    const { post } = usePostData("chat");

    const handleSubmit = e => {
        e.preventDefault();
        post({ variables: { message, participant: username } });
        setIsSent(true)
    }

    if (isSent) {
        return <AlertTimer duration="5000" heading="Your message was sent successfully" text={<Link to="/messages" className="customLink">go to messenger</Link>} />
    }


    return (
        <CustomModal
            modal_title="send message"
            modal_class="create-chat"
            modal_size="md"
            btn_class="profileHeader__btn fa fa-edit"
            btn_title="message">
            <MessageForm onSubmit={handleSubmit} onChange={({ target }) => setMessage(target.value)} message={message} msg_class="userMessage" />
            {/* {!isSent ?
                <MessageForm onSubmit={handleSubmit} onChange={({ target }) => setMessage(target.value)} message={message} msg_class="userMessage" />
                :
                <div className="success">
                    <h5>Your message was sent successfully</h5>
                   
                </div>
            } */}
        </CustomModal>
    )

}

export default withRouter(UserMessage);
