import React, { useState, useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import AuthContext from '../../context/Auth-context';
import UserAvatar from '../../components/user/UserAvatar';
import ChatActive from './ChatActive';
import ChatHistory from './ChatHistory'
import SearchBox from '../../components/inputs/SearchBox'
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';
import SectionWrapper from '../../layout/SectionWrapper';
import BoxWrapper from '../../layout/BoxWrapper';


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
        <>
            <SectionWrapper section_class="chats__history">
                <BoxWrapper box_class="chats__header chats-search">
                    <SearchBox onClick={handleSearchChat} />
                </BoxWrapper>
                <BoxWrapper box_class="chats__userList">
                    {chats && <ChatHistory chats={chats} seeChat={handleActiveChat} activeChatIndex={activeChat} />}
                </BoxWrapper>
            </SectionWrapper>
            <SectionWrapper section_class="chats__active">
                <BoxWrapper box_class="chats__header">
                    {user2 && <UserAvatar username={user2.username} profileImage={user2.profileImage} />}
                </BoxWrapper>
                {chats && chats.length > 0 ? <ChatActive chat={chats[activeChat]} addMessage={addMessage} />
                    : <EmptyResultAlert type="messages" />}
            </SectionWrapper>

        </>


    )
}

export default ChatGrid
