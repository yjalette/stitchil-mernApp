import React, { useContext, useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';

const defImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104590/shared/profile-img-female_fb0wc8.jpg"

const ChatHistory = ({ chats, openChat }) => {
    const [activeChatIndex, setActiveChatIndex] = useState(null);
    const { user } = useContext(AuthContext);
    // const getParticipient = index => chats[index].members.find(member => member.username !== user.username);
    const getParticipient = chat => {
        const sender = chat.sender.username;
        const recipient = chat.recipient.username;
        return [sender, recipient].find(member => user.username !== member)
    };

    const handleClick = (index, member) => {
        setActiveChatIndex(index);
        console.log(member)
        openChat(member)
    }

    return (
        <>
            {chats.map((chat, index) => {
                // const user2 = getParticipient(chat)
                return (
                    <div key={index} onClick={() => handleClick(index, chat.member)} className={`${activeChatIndex === index && 'chatHistory__item-active'} chatHistory__item`}>
                        <Image src={chat.chatImg || defImg} className="chatHistory__img" />
                        <Container className="chatHistory__content" >
                            <span className="username">{chat.member} </span>
                            <p className="chatHistory__text">{chat.lastMessage ? chat.lastMessage.slice(0, 15) + "..." : ""}</p>
                            <span className="chatHistory__date time_date">{chat.updatedAt ? dateHelper(chat.updatedAt) : "just now"}</span>
                        </Container>
                    </div>
                )
            }
            )}
        </>
    )
}

export default ChatHistory
