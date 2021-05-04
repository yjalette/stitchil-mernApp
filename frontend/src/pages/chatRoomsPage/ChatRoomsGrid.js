import React, { useState } from 'react'
import { Container, Image } from 'react-bootstrap';
import SectionWrapper from '../../layout/SectionWrapper';
import CustomAlert from '../../layout/CustomAlert';
import dateHelper from '../../helpers/dateHelper';
import FormSearch from '../../components/inputs/FormSearch';
import ChatMessageData from '../../components/chat/ChatMessageData';
import UserAvatar from '../../components/user/UserAvatar';
import { useParams } from 'react-router';

const defImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104590/shared/profile-img-female_fb0wc8.jpg"

const ChatRoomsGrid = ({ chats, activeChatIndex, activeChat, selectChat }) => {
    const { username } = useParams()
    const [notFound, setNotFound] = useState(false);
    const chatId = chats && chats.length > 0 && chats[activeChatIndex].chatId || null
    return (
        <>
            <SectionWrapper section_class="chats-leftCol" >
                <section className="chats__header chats-search">
                    {chats && chats.length > 0 && <FormSearch
                        // handleSearch={handleFindChat}
                        placeholder="find a chat ..."
                        btn_class="btn-icon-text"
                    />}
                </section>
                <section className="chats__history">
                    {notFound && <CustomAlert alert_variant="danger">no chat found</CustomAlert>}
                    {chats && chats.length > 0 && chats.map((chat, index) => {
                        return (
                            <div key={index} onClick={() => selectChat(index, chat.member)} className={`${activeChatIndex === index && 'chatHistory__item-active'} chatHistory__item`}>
                                <Image src={chat.chatImg || defImg} className="chatHistory__img" />
                                <Container className="chatHistory__content" >
                                    <span className="username">{chat.member} </span>
                                    <p className="chatHistory__text">{chat.lastMessage ? chat.lastMessage.slice(0, 15) + "..." : ""}</p>
                                    <span className="chatHistory__date time_date">{chat.updatedAt ? dateHelper(chat.updatedAt) : "just now"}</span>
                                </Container>
                            </div>
                        )
                    })}
                </section>
            </SectionWrapper>
            <SectionWrapper section_class="messages">
                <section className="messages__header">
                    {username && <UserAvatar username={username} />}
                </section>
                {chatId && <ChatMessageData chatId={chatId} />}
            </SectionWrapper>
        </>
    )
}

export default ChatRoomsGrid
