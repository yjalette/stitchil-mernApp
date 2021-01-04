import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth-context';
import useGetData from '../../custom_hooks/useGetData';
import ChatGrid from './ChatGrid';



const ChatData = () => {
    const { user } = useContext(AuthContext);
    const { data, getData, updateQuery } = useGetData("chats")

    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (user.username) getData();
    }, [user])

    useEffect(() => {
        if (data) setChats(data.chats);
    }, [data])


    const handleNewMessage = newMsg => updateQuery(prev => {
        const chatIndex = prev.chats.findIndex(el => el._id === newMsg.docId)
        prev.chats[chatIndex].messages.push({ ...newMsg, _id: 0, sender: { ...newMsg.sender, profileImage: null, __typename: "" }, createdAt: new Date(), __typename: "" })
        return prev
    })


    return <ChatGrid chats={chats} addMessage={handleNewMessage} />

}

export default ChatData;
