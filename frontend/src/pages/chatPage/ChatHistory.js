import React, { useContext, useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';

const ChatHistory = ({ chats, openChat }) => {
    const [activeChatIndex, setActiveChatIndex] = useState(null);
    const { user } = useContext(AuthContext);
    const getParticipient = index => chats[index].members.find(member => member.username !== user.username);

    const handleClick = (index, member) => {
        setActiveChatIndex(index);
        console.log(member)
        openChat(member)
    }

    return (
        <>
            {chats.map((chat, index) => {
                const user2 = getParticipient(index)
                return (
                    <div key={index} onClick={() => handleClick(index, user2.username)} className={`${activeChatIndex === index && 'chatHistory__item-active'} chatHistory__item`}>
                        <Image src={user2.profileImage || "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104590/shared/profile-img-female_fb0wc8.jpg"} className="chatHistory__img" />
                        <Container className="chatHistory__content" >
                            <span className="username">{user2.username} </span>
                            <p className="chatHistory__text">{chat.messages[0] ? chat.messages[0].message.slice(0, 15) + "..." : ""}</p>
                            <span className="chatHistory__date time_date">{chat.messages[0].createdAt ? dateHelper(chat.messages[0].createdAt) : "just now"}</span>
                        </Container>
                    </div>
                )
            }
            )}
        </>
    )
}

export default ChatHistory
