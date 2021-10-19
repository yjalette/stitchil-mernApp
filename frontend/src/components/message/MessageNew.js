import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { MESSAGE_LIST_QUERY } from './graphql/queries';
import { NEW_MESSAGE_SUBSCRIPTION } from "./graphql/subscriptions"

const MessageNew = ({ chatId }) => {
    const { data: newMessage } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        variables: { chatId },
        skip: !chatId
    });

    console.log(newMessage)

    return (
        <div>

        </div>
    )
}

export default MessageNew
