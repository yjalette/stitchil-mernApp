import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { CHAT_NEW_MESSAGE_SUBSCRIPTION } from './graphql/subscriptions';
import MessageGrid from './MessageGrid';

const MessageData = ({ chat, updateCache, hideChat }) => {
    const { username } = useParams()
    const [state, setState] = useState({});
    const { data } = useSubscription(
        CHAT_NEW_MESSAGE_SUBSCRIPTION,
        { variables: { chatId: chat && chat.chatId, username } }
    );

    useEffect(() => {
        if (chat) return setState(chat)
    }, [chat]);

    useEffect(() => {
        if (data) return updateCache(data.chat_new_message)
    }, [data]);

    return <MessageGrid messages={state.lastMessages} chatId={state.chatId} hideChat={hideChat} />
}

export default MessageData

