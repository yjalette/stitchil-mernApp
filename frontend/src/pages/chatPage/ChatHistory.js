import React, { useContext, useEffect, useRef } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';

const ChatHistory = ({ chats, activeChatIndex, seeChat }) => {
    const { user } = useContext(AuthContext);

    return (
        <section className="chatHistory__wrapper d-flex flex-column">
            {chats && chats.length > 0 && chats.map((chat, index) => {
                const user2 = chat.members.find(member => member.username !== user.username);
                return (
                    <Row key={index} onClick={() => seeChat(index)} className={`${activeChatIndex === index && 'chatHistory__item-active'} chatHistory__item`}>
                        <Col xs={4} className="chatHistory__item__col" >
                            <Image src={user2.profileImage || "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104590/shared/profile-img-female_fb0wc8.jpg"} className="chatHistory__item__img" />
                        </Col>
                        <Col xs={7} className="chatHistory__item__col" >
                            <span className="username">{user2.username} </span>
                            <p className="chatHistory__item__text">{chat.messages[0] ? chat.messages[0].message.slice(0, 15) + "..." : ""}</p>
                            <span className="chatHistory__item__date time_date">{chat.messages[0].createdAt ? dateHelper(chat.messages[0].createdAt) : "just now"}</span>
                        </Col>
                    </Row>
                )
            }
            )}
        </section>
    )
}

export default ChatHistory
