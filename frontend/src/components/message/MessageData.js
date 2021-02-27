import React, { useEffect, useState } from 'react';

import "./style.css"
import { useLazyQuery } from '@apollo/react-hooks';
import { MESSAGES_QUERY } from './graphql/queries';
import MessageGrid from './MessageGrid';
import MessageCreate from './MessageCreate';

const MessageData = ({ docId, children }) => {
    const [getData, { data, error }] = useLazyQuery(MESSAGES_QUERY);
    const [values, setValues] = useState([])

    useEffect(() => {
        if (docId) getData({ variables: { docId } })
    }, [docId]);

    useEffect(() => {
        if (data) setValues(data.messages)
    }, [data]);

    const handleNewMessage = newMessage => {
        setValues([
            newMessage,
            ...values
        ])
    }

    return (
        <MessageGrid messages={values} >
            {children}
            {/* <MessageCreate docId={docId} addMessage={addMessage} /> */}
        </MessageGrid>
    )

}

export default MessageData;


