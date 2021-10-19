import React from 'react';
import { useParams } from 'react-router';
import MessageListData from '../../components/message/MessageListData';
import MessageSend from '../../components/message/MessageSend';
import PageWrapper from '../../layout/PageWrapper';
import "./style.css"

const MessengerPage = () => {
    const { chatId } = useParams()
    return (
        <PageWrapper mod_class="messenger">
            <MessageListData chatId={chatId}>
                <MessageSend chatId={chatId} />
            </MessageListData>
        </PageWrapper>
    )
}

export default MessengerPage
