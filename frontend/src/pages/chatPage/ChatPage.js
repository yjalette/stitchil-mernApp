import React from 'react'
import CustomModal from '../../layout/CustomModal';
import PageWrapper from '../../layout/PageWrapper';
import ChatData from './ChatData';

import './style.css'

const ChatPage = () => {
    return <CustomModal modal_class="chat-modal" modal_title="messenger" displayWithoutBtn>
        <ChatData />
    </CustomModal>
}

export default ChatPage
{/* <PageWrapper page_class="chat"> </PageWrapper> */ }