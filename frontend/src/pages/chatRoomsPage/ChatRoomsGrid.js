import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import dateHelper from '../../helpers/dateHelper';
import FormSearch from '../../components/inputs/FormSearch';
import MessageData from '../../components/message/MessageData';
import SectionWrapper from '../../layout/SectionWrapper';
import { useToggle } from '../../custom_hooks/useToggle';

const defImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104590/shared/profile-img-female_fb0wc8.jpg"

const ChatRoomsGrid = ({ chats, selectChat, updateCache }) => {
    const { username } = useParams();
    const [open, setOpen] = useToggle(false);

    const handleClick = (index, member) => {
        selectChat(index, member);
        setOpen(true)
    }

    return (
        <SectionWrapper>
            <Row className="chats__row">
                <Col xl={4} md={5} sm={12} className={`chats__userList__wrapper ${open ? "hide" : "show"}`}>
                    <section className="chats__header chats-search">
                        {chats && chats.length > 0 && <FormSearch
                            // handleSearch={handleFindChat}
                            placeholder="find a chat ..."
                            btn_class="btn-icon-text"
                        />}
                    </section>
                    <section className="chats__userList">
                        {chats && chats.length > 0 ? chats.map((chat, index) => {
                            const { member, lastMessages, updatedAt, chatImg } = chat;
                            return (
                                <div key={index} onClick={() => handleClick(index, member)}
                                    className={`chatHistory__item ${username === member && 'active'}`}>
                                    <Image src={chatImg || defImg} className="chatHistory__img" />
                                    <Container className="chatHistory__content" >
                                        <span className="username">{member} </span>
                                        <p className="chatHistory__text">{lastMessages ? lastMessages[lastMessages.length - 1].message.slice(0, 15) + "..." : ""}</p>
                                        <span className="chatHistory__date time_date">{updatedAt ? dateHelper(updatedAt) : "just now"}</span>
                                    </Container>
                                </div>
                            )

                        })
                            : <></>
                        }
                    </section>
                </Col>
                <Col xl={8} md={7} sm={12} className={`chats__activeChat__wrapper ${open ? "show" : "hide"}`}>
                    <MessageData hideChat={() => setOpen(false)} updateCache={updateCache} chat={chats.find(chat => chat.member === username)} />
                </Col>
            </Row>
        </SectionWrapper>
    )
}

export default ChatRoomsGrid



{/* <ChatNewMessage /> */ }
{/* <SectionWrapper section_class="chats-leftCol" >
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
                <div key={index}
                    onClick={() => selectChat(index, chat.member)}
                    className={`chatHistory__item ${activeChatIndex === index && 'active'}`}>
                    <Image src={chat.chatImg || defImg} className="chatHistory__img" />
                    <Container className="chatHistory__content" >
                        <span className="username">{chat.member} </span>
                        <p className="chatHistory__text">{chat.lastMessages ? chat.lastMessages.slice(0, 15) + "..." : ""}</p>
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
    {username && <ChatMessageData chatId={chatId} />}
</SectionWrapper> */}
