import React, { useState, useRef, useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import MessageCreate from '../../components/message/MessageCreate';
import AuthContext from '../../context/Auth-context';
import UserAvatar from '../../components/user/UserAvatar';
import ChatActive from './ChatActive';
import ChatHistory from './ChatHistory'
import ChatSearch from './ChatSearch';
import ChatHeader from './ChatHeader';
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';


const ChatGrid = ({ chats, addMessage }) => {
    const { user } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(0);

    const handleActiveChat = index => setActiveChat(index);

    const handleSearchChat = username => {
        const newIndex = chats.findIndex(chat => chat.members.map(member => member.username === username))
        setActiveChat(newIndex)
        console.log(newIndex)
    }

    console.log(activeChat)

    return (
        <div className="chats__wrapper">
            <ChatHeader
                onSearch={handleSearchChat}
                chatUser={chats && chats[activeChat] && chats[activeChat].members.find(member => member.username !== user.username)} />
            <Row className="chats">
                <Col lg={4} className="p-0">
                    {chats && <ChatHistory chats={chats} seeChat={handleActiveChat} activeChatIndex={activeChat} />}
                </Col>
                <Col lg={8}>
                    {chats && chats.length > 0 ? <div className="chatActive">
                        <ChatActive chat={chats[activeChat]} addMessage={addMessage} />
                        <MessageCreate docId={chats[activeChat] && chats[activeChat]._id} addMessage={addMessage} />
                    </div> : <EmptyResultAlert type="messages" />}
                </Col>
            </Row>

        </div>
    )
}

export default ChatGrid
