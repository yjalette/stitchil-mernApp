import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';

import "./style.css"
import { MESSAGES_QUERY } from './graphql/queries';
import { CREATE_MESSAGE_MUTATION } from "./graphql/mutations"
import MessageGrid from './MessageGrid';
import MessageCreate from './MessageCreate';
import UserAvatar from '../user/UserAvatar';
import AuthContext from '../../context/Auth-context';
import SectionWrapper from '../../layout/SectionWrapper';

const MessageData = () => {
    const { user } = useContext(AuthContext)
    const { username, chatId } = useParams()
    const [getData, { data, updateQuery }] = useLazyQuery(MESSAGES_QUERY);
    const [values, setValues] = useState([])

    useEffect(() => {
        if (username && getData) getData({ variables: { member: username, chatId } })
    }, [username, getData]);

    useEffect(() => {
        if (data) setValues(data.messages)
    }, [data]);

    const handleNewMessage = (newMsg) => console.log(newMsg) || updateQuery(prev => {
        return {
            messages: [
                ...prev.messages,
                {
                    ...newMsg.createMessage,
                    sender: {
                        ...newMsg.createMessage.sender
                    }
                }
            ]
        }
    })

    return (
        <SectionWrapper section_class="messages">
            <section className="messages__header">
                {username && <UserAvatar username={username} />}
            </section>
            <section className="messages__body">
                <MessageGrid messages={values} />
                {username && <MessageCreate onMessageSent={handleNewMessage} mutation={CREATE_MESSAGE_MUTATION} />}
            </section>
        </SectionWrapper>
    )

}

export default MessageData;


