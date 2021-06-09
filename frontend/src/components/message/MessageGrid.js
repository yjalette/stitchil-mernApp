import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import CustomAlert from '../../layout/CustomAlert';
import UserAvatar from '../user/UserAvatar';
import MessageSend from './MessageSend';
import MessageItem from './MessageItem';
import "./style.css"
import CustomButton from '../../layout/button/CustomButton';

const MessageGrid = ({ messages, chatId, hideChat }) => {
    const { username } = useParams();
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);
    return (
        <>
            <section className="messages__header">
                {hideChat && <CustomButton
                    btn_class="btn-icon-text messages__hide-btn"
                    icon="fas fa-angle-left"
                    onClick={hideChat} />}
                {username && <UserAvatar username={username} />}
            </section>
            <section className="messages__container">
                <div className="messages">
                    {messages && messages.length > 0 ? messages
                        // .sort((a, b) => a.createdAt - b.createdAt)
                        .map((msg, i) => <MessageItem key={i} item={msg} />)
                        : <CustomAlert alert_variant="info" alert_class="messages__alert">
                            <span>no message history yet</span>
                        </CustomAlert>
                    }
                    <div ref={divRef} />
                </div>
                <MessageSend chatId={chatId} />
            </section>
        </>
    )
}

export default MessageGrid
