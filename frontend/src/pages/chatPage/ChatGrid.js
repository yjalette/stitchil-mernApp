import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/Auth-context';
import UserAvatar from '../../components/user/UserAvatar';
import ChatHistory from './ChatHistory'
import SearchBox from '../../components/inputs/SearchBox'
import SectionWrapper from '../../layout/SectionWrapper';
import BoxWrapper from '../../layout/BoxWrapper';
import MessageData from '../../components/message/MessageData';

const ChatGrid = ({ chats }) => {
    return (
        <>
            <SectionWrapper section_class="chats__history">
                <BoxWrapper box_class="chats__header chats-search">
                    <SearchBox />
                </BoxWrapper>
                <BoxWrapper box_class="chats__userList">
                    {chats && <ChatHistory chats={chats} />}
                </BoxWrapper>
            </SectionWrapper>
            <MessageData />
        </>
    )
}

export default ChatGrid
