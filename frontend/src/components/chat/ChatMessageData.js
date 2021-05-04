import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import SectionWrapper from '../../layout/SectionWrapper';
import UserAvatar from '../user/UserAvatar';
import ChatGrid from './ChatGrid';
import ChatMessageSend from './ChatMessageSend';
import { CHAT_MESSAGES_QUERY } from './graphql/queries';
import { CHAT_MESSAGES_SUBSCRIPTION } from './graphql/subscriptions';
import "./style.css"
import { useToggle } from '../../custom_hooks/useToggle';

const ChatMessageData = ({ chatId }) => {
    const { username } = useParams();
    const [values, setValues] = useState([]);
    const [newMessageAlert, setNewMessageAlert] = useToggle()
    const { data, subscribeToMore } = useQuery(CHAT_MESSAGES_QUERY, {
        variables: { chatId }
    });

    useEffect(() => {
        if (data && data.chat_messages) {
            setValues(data.chat_messages)
            // if (username && subscribe) return subscribe()
        }
    }, [data]);

    useEffect(() => {
        if (chatId && subscribe) return subscribe(chatId)
    }, [chatId]);

    function subscribe(chatId) {
        console.log(chatId)
        subscribeToMore({
            document: CHAT_MESSAGES_SUBSCRIPTION,
            variables: { chatId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return values;
                const newFeed = subscriptionData.data.chat_messages;
                console.log(newFeed)
                if (newFeed && newFeed.sender.username === username) return Object.assign({}, prev, {
                    chat_messages: [...prev.chat_messages, newFeed]
                });
            }
        })
    }

    function addMessage(newMsg) {
        setValues([
            ...values,
            newMsg
        ])
    }

    function onMessageDelete(id) {
        setValues(values.filter(msg => msg._id !== id))
    }

    return (
        <ChatGrid
            messages={values}
            onMessageDelete={onMessageDelete}>
            <ChatMessageSend
                chatId={chatId}
                member={username}
                addMessage={addMessage} />
        </ChatGrid>
    )


}

export default ChatMessageData


