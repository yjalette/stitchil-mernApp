import React, { useContext, useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';

const ChatHistory = ({ chats }) => {
    const [activeChatIndex, setActiveChatIndex] = useState(null);
    const { user } = useContext(AuthContext);
    const { push } = useHistory();
    const getParticipient = index => chats[index].members.find(member => member.username !== user.username);

    useEffect(() => {
        // activeChatIndex dependency
        if (chats.length > 0 && !activeChatIndex) push(`/messages/${getParticipient(0).username}`)
    }, [chats, push, getParticipient])

    const handleClick = (index) => {
        setActiveChatIndex(index);
        push(`/messages/${getParticipient(index).username}`)
    }

    return (
        <>
            {chats && chats.length > 0 && chats.map((chat, index) => {
                const user2 = getParticipient(index)
                return (
                    <div key={index} onClick={() => handleClick(index)} className={`${activeChatIndex === index && 'chatHistory__item-active'} chatHistory__item`}>
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
