import React, { useState } from 'react';
import ChatHistory from './ChatHistory'
import FormSearch from '../../components/inputs/FormSearch'
import SectionWrapper from '../../layout/SectionWrapper';
import MessageData from '../../components/message/MessageData';
import CustomAlert from '../../layout/CustomAlert';

const ChatGrid = ({ chats, navigateChat }) => {
    const [notFound, setNotFound] = useState(false);

    const handleFindChat = chatMember => {
        return navigateChat(chatMember);
    }
    return (
        <>

            <SectionWrapper section_class="chats-leftCol" >
                <section className="chats__header chats-search">
                    {chats && chats.length > 0 && <FormSearch
                        handleSearch={handleFindChat}
                        placeholder="find a chat ..."
                        btn_class="btn-icon-text"
                    />}
                </section>
                <section className="chats__history">
                    {notFound && <CustomAlert alert_variant="danger">no chat found</CustomAlert>}
                    {chats && chats.length > 0 && <ChatHistory chats={chats} openChat={navigateChat} />}
                </section>
            </SectionWrapper>
            <MessageData />
        </>
    )
}

export default ChatGrid
