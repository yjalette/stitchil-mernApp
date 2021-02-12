import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth-context';
import useQueryHook from '../../custom_hooks/useQueryHook';
import ChatGrid from './ChatGrid';
import { CHATS_QUERY } from './graphql/queries';

const ChatData = () => {
    const { user } = useContext(AuthContext);
    const { data, updateQuery } = useQueryHook(CHATS_QUERY)
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (data) setChats(data.chats);
    }, [data])

    const handleNewMessage = newMsg => updateQuery(prev => {
        console.log(newMsg)
        const chatIndex = prev.chats.findIndex(el => el._id === newMsg.docId)
        prev.chats[chatIndex].messages.push({ ...newMsg, _id: 0, sender: { ...newMsg.sender, profileImage: null, __typename: "" }, createdAt: new Date(), __typename: "" })
        return prev
    })


    return <ChatGrid chats={chats} addMessage={handleNewMessage} />

}

export default ChatData;
