import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { MESSAGE_LIST_QUERY } from './graphql/queries';
import { NEW_MESSAGE_SUBSCRIPTION } from "./graphql/subscriptions"
import MessageList from './MessageList';
import ChatContext from '../../context/Chat-context';

const MessageListData = ({ chatId, children }) => {
    const [state, setState] = useState([]);
    const { data, loading, updateQuery } = useQuery(MESSAGE_LIST_QUERY, {
        variables: { chatId },
        skip: !chatId
    })

    const { data: message } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        variables: { chatId }
    });

    console.log("tuta", message)

    useEffect(() => {
        if (data) setState(data.messageList)
    }, [data])

    useEffect(() => {
        console.log(message)
        if (message) setState([
            ...state,
            message.newMessage
        ])
    }, [message])



    const updateCache = newMsg => {
        updateQuery(prev => {
            // return {
            //     messageList [...state.messages, newMsg]
            // }
        })
    }

    if (loading) return <div> ...loading</div>

    return (
        <ChatContext.Provider value={{ messages: state, updateCache }}>
            <MessageList messages={state} />
            {children}
        </ChatContext.Provider>
    )

}
export default MessageListData
