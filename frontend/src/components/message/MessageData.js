import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks';
import { CHAT_NEW_MESSAGE_SUBSCRIPTION } from './graphql/subscriptions';
import MessageGrid from './MessageGrid';
import CustomAlert from '../../layout/CustomAlert';

const MessageData = ({ chat, updateCacheNewMsg, updateCacheNewChat, hideChat }) => {
    const [state, setState] = useState({});
    const { data } = useSubscription(
        CHAT_NEW_MESSAGE_SUBSCRIPTION,
        { variables: { chatId: chat && chat.chatId } }
    );

    useEffect(() => {
        if (chat) return setState(chat)
    }, [chat]);

    useEffect(() => {
        if (data) return updateCacheNewMsg(data.chat_new_message)
    }, [data]);

    if (!chat) return (
        <CustomAlert alert_variant="info" alert_class="messages__alert">
            <span>no message history yet</span>
        </CustomAlert>
    )

    return <MessageGrid messages={state.lastMessages} chatId={state.chatId} hideChat={hideChat} updateCacheNewChat={updateCacheNewChat} />
}

export default MessageData

