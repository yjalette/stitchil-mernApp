
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import { CHATS_ROOMS_QUERY } from './graphql/queries';
import ChatRoomsGrid from './ChatRoomsGrid';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChatRoomsData = () => {
    const { username } = useParams()
    const { push } = useHistory()
    const [chats, setChats] = useState([])
    const [getData, { data, loading, updateQuery }] = useLazyQuery(CHATS_ROOMS_QUERY);
    const [activeChatIndex, setActiveChatIndex] = useState(0);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (data && data.chat_rooms && data.chat_rooms.length > 0) {
            setChats(data.chat_rooms)
            if (!username) return openChat(data.chat_rooms[0].member)
        }
    }, [data])

    useEffect(() => {
        if (username && !chats.find(chat => chat.member === username)) {
            setChats([
                { member: username },
                ...chats
            ])
        }
    }, [chats])


    const updateCacheNewChat = (newChat) => {
        updateQuery(({ chat_rooms }) => {
            const newState = [...chat_rooms]
            newState.push(newChat);
            return setChats(newState)
        })
    }

    const updateCacheNewMsg = (newMessage) => {
        updateQuery(({ chat_rooms }) => {
            const newState = [...chat_rooms]
            const chatIndex = newState.findIndex(chat => chat._id === newMessage.chatId)
            newState[chatIndex].lastMessages.push(newMessage);
            return setChats(newState)
        })
    }

    const handleClick = (index, member) => {
        setActiveChatIndex(index);
        return openChat(member)
    }

    function openChat(member) {
        return push(`/messages/${member}/`);
    }

    if (loading) return <LoadingSpinner />

    return <ChatRoomsGrid
        chats={chats}
        updateCacheNewChat={updateCacheNewChat}
        updateCacheNewMsg={updateCacheNewMsg}
        selectChat={handleClick}
        activeChatIndex={activeChatIndex}
    />
}

export default ChatRoomsData;
