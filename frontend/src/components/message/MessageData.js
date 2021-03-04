import React, { useEffect, useState } from 'react';

import "./style.css"
import { useLazyQuery } from '@apollo/react-hooks';
import { MESSAGES_QUERY } from './graphql/queries';
import { CREATE_MESSAGE_MUTATION } from "./graphql/mutations"
import MessageGrid from './MessageGrid';
import MessageCreate from './MessageCreate';
import { useParams } from 'react-router-dom';
import BoxWrapper from '../../layout/BoxWrapper';
import UserAvatar from '../user/UserAvatar';
import SectionWrapper from '../../layout/SectionWrapper';

const MessageData = () => {
    const { username } = useParams()
    const [getData, { data, updateQuery }] = useLazyQuery(MESSAGES_QUERY);
    const [values, setValues] = useState([])

    useEffect(() => {
        if (username && getData) getData({ variables: { username } })
    }, [username, getData]);

    useEffect(() => {
        if (data) setValues(data.messages)
    }, [data]);

    const handleNewMessage = (newMsg) => console.log(newMsg) || updateQuery(prev => {
        return {
            messages: [
                ...prev.messages,
                newMsg.createMessage
            ]
        }
    })

    return (
        <SectionWrapper section_class="messages">
            <BoxWrapper box_class="messages__header">
                {username && <UserAvatar username={username} />}
            </BoxWrapper>
            <MessageGrid messages={values} ></MessageGrid>
            <MessageCreate onMessageSent={handleNewMessage} mutation={CREATE_MESSAGE_MUTATION} />
        </SectionWrapper>
    )

}

export default MessageData;


