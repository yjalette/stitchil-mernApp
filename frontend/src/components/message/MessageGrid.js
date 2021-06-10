import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import CustomAlert from '../../layout/CustomAlert';
import UserAvatar from '../user/UserAvatar';
import MessageSend from './MessageSend';
import MessageItem from './MessageItem';
import CustomButton from '../../layout/button/CustomButton';
import "./style.css"

const MessageGrid = ({ messages, chatId, hideChat, updateCacheNewChat }) => {
    const { username } = useParams();
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chatId]);

    return (
        <>
            <Container className="messages__header">
                {hideChat && <CustomButton
                    btn_class="btn-icon-text messages__hide-btn"
                    icon="fas fa-angle-left"
                    onClick={hideChat} />}
                <UserAvatar username={username} />
            </Container>
            <section className="messages__container">
                <Container className="messages">
                    {messages && messages.length > 0 ? messages
                        // .sort((a, b) => a.createdAt - b.createdAt)
                        .map((msg, i) => <MessageItem key={i} item={msg} />)
                        : <></>
                    }
                    <div ref={divRef} />
                </Container>
                <MessageSend chatId={chatId} updateCacheNewChat={updateCacheNewChat} />
            </section>
        </>
    )
}

export default MessageGrid
