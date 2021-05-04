
import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import { CHATS_ROOMS_QUERY } from './graphql/queries';

import ChatRoomsGrid from './ChatRoomsGrid';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChatRoomsData = () => {
    const { data, loading } = useQuery(CHATS_ROOMS_QUERY);
    const [activeChatIndex, setActiveChatIndex] = useState(0);
    const [activeChat, setActiveChat] = useState();
    const [chats, setChats] = useState([])
    const { push } = useHistory()
    const { username } = useParams()

    useEffect(() => {
        if (data && data.chat_rooms && data.chat_rooms.length > 0) {
            setChats(data.chat_rooms)
            if (!username) return openChat(data.chat_rooms[0].member)
        }
    }, [data])

    const handleClick = (index, member) => {
        setActiveChatIndex(index);
        setActiveChat(chats[index]);
        return openChat(member)
        // selectChat(member, chats[index].chatId)

    }

    function openChat(member) {
        return push(`/messages/${member}/`);
    }

    if (loading) return <LoadingSpinner />

    return <ChatRoomsGrid
        chats={chats}
        selectChat={handleClick}
        activeChatIndex={activeChatIndex}
        activeChat={activeChat}
    />
}

export default ChatRoomsData;
