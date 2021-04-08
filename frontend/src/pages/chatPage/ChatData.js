
import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CHATS_QUERY } from './graphql/queries';
import ChatGrid from './ChatGrid';
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthContext from '../../context/Auth-context';

const ChatData = () => {
    const { user } = useContext(AuthContext);
    const [getData, { data, loading, updateQuery }] = useLazyQuery(CHATS_QUERY)
    const { push } = useHistory()
    const [chats, setChats] = useState([]);
    // const getParticipient = index => chats[index].members.find(member => member.username !== user.username).username;
    const navigateChat = param => console.log(param) || push(`/messages/${param}`)

    useEffect(() => {
        if (getData) getData();
    }, [getData])

    useEffect(() => {
        if (data) {
            setChats(data.chats);
            // if (data.chats[0]) {
            //     navigateChat(data.chats[0].members
            //         .find(member => member.username !== user.username).username)
            // }
        }
    }, [data])



    console.log(data)
    if (loading) return <LoadingSpinner />

    // const handleNewMessage = (data, { docId }) => updateQuery(prev => {
    //     console.log(data)
    //     const newMsg = data.updateChat;
    //     // updateQuery doesn't work with useQuery??
    //     const chatIndex = prev.chats.findIndex(el => el._id === docId)
    //     prev.chats[chatIndex].messages.push(newMsg)
    //     return prev
    // })


    return <ChatGrid chats={chats} navigateChat={navigateChat} />

}

export default ChatData;
