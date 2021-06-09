
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
            console.log(data)
            setChats(data.chat_rooms)
            if (!username) return openChat(data.chat_rooms[0].member)
        }
    }, [data])

    useEffect(() => {
        if (username && !chats.find(chat => chat.member === username)) {
            setChats([
                {
                    member: username,
                    messages: []
                },
                ...chats
            ])
        }
    }, [chats])



    const updateCacheNewMsg = (newMessage) => {
        updateQuery(({ chat_rooms }) => {
            const chatIndex = chats.findIndex(chat => chat._id === newMessage.chatId)
            const newState = [...chat_rooms]
            console.log(chatIndex)
            newState[chatIndex].lastMessages.push(newMessage);
            console.log(newState)
            return setChats(newState)
        })
    }

    console.log(chats)

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
        updateCache={updateCacheNewMsg}
        selectChat={handleClick}
        activeChatIndex={activeChatIndex}
    />
}

export default ChatRoomsData;
