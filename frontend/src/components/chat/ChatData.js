import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { CHAT_QUERY } from './graphql/queries';
import MessageList from '../message/MessageList';
import ChatContext from '../../context/Chat-context';

const ChatData = ({ chatId, children }) => {
    const [state, setState] = useState({});
    const { data, loading, updateQuery } = useQuery(CHAT_QUERY, {
        variables: { chatId },
        skip: !chatId
    })

    useEffect(() => {
        if (data) setState(data.chat)
    }, [data])

    const updateCache = newMsg => {
        updateQuery(prev => {
            return {
                ...prev.chat,
                messages: [...state.messages, newMsg]
            }
        })
    }

    if (loading) return <div> ...loading</div>

    return (
        <ChatContext.Provider value={{ messages: data.chat.messages, chat: state, updateCache }}>
            <MessageList messages={data.chat.messages} />
            {children}
        </ChatContext.Provider>
    )

}
export default ChatData
