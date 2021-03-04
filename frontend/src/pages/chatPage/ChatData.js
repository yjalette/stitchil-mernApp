
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

    // const handleNewMessage = (data, { docId }) => updateQuery(prev => {
    //     console.log(data)
    //     const newMsg = data.updateChat;
    //     // updateQuery doesn't work with useQuery??
    //     const chatIndex = prev.chats.findIndex(el => el._id === docId)
    //     prev.chats[chatIndex].messages.push(newMsg)
    //     return prev
    // })


    return <ChatGrid chats={chats} />

}

export default ChatData;
