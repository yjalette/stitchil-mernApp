import React, { useState, useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import AuthContext from '../../context/Auth-context';
import UserAvatar from '../../components/user/UserAvatar';
import ChatActive from './ChatActive';
import ChatHistory from './ChatHistory'
import SearchBox from '../../components/inputs/SearchBox'
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';


const ChatGrid = ({ chats, addMessage }) => {
    const { user } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(0);
    const user2 = chats && chats[activeChat] && chats[activeChat].members.find(member => member.username !== user.username)
    const handleActiveChat = index => setActiveChat(index);

    const handleSearchChat = username => {
        const newIndex = chats.findIndex(chat => chat.members.map(member => member.username === username))
        setActiveChat(newIndex)
        console.log(newIndex)
    }

    return (

        <Row className="chat__grid">
            <Col lg={4} sm={12} className="chat__col-history">
                <Container className="chatHistory__header">
                    {chats && <SearchBox onClick={handleSearchChat} />}
                </Container>
                {chats && <ChatHistory chats={chats} seeChat={handleActiveChat} activeChatIndex={activeChat} />}
            </Col>
            <Col lg={8} sm={12} className="chat__col-active">
                {user2 && <UserAvatar username={user2.username} profileImage={user2.profileImage} />}
                {chats && chats.length > 0 ? <ChatActive chat={chats[activeChat]} addMessage={addMessage} />
                    : <EmptyResultAlert type="messages" />}
            </Col>
        </Row>


    )
}

export default ChatGrid
