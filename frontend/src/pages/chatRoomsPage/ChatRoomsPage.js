import React from 'react';
import PageWrapper from '../../layout/PageWrapper';
import ChatRoomsData from './ChatRoomsData';
import "./style.css"

const ChatRoomsPage = () => {
    return (
        <PageWrapper page_class="chatRooms">
            <ChatRoomsData />
        </PageWrapper>
    )
}

export default ChatRoomsPage
