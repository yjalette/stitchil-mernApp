
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { CHATS_QUERY } from './graphql/queries';
import ChatGrid from './ChatGrid';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChatData = () => {
    const [getData, { data, loading, updateQuery }] = useLazyQuery(CHATS_QUERY)
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (getData) getData();
    }, [getData])

    useEffect(() => {
        if (data) setChats(data.chats);
    }, [data])

    if (loading) return <LoadingSpinner />

    const handleNewMessage = newMsg => updateQuery(prev => {
        // updateQuery doesn't work with useQuery??
        const chatIndex = prev.chats.findIndex(el => el._id === newMsg.docId)
        prev.chats[chatIndex].messages.push({ ...newMsg, _id: 0, sender: { ...newMsg.sender, profileImage: null, __typename: "" }, createdAt: new Date(), __typename: "" })
        return prev
    })


    return <ChatGrid chats={chats} addMessage={handleNewMessage} />

}

export default ChatData;
