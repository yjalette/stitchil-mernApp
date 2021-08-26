import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';

import AuthContext from '../../context/Auth-context';
import ChatContext from '../../context/Chat-context';
import MessageForm from '../message/MessageForm';

const ChatSendMessage = () => {
    const { user } = useContext(AuthContext)
    const { chat, updateCache } = useContext(ChatContext)
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
        onCompleted: async ({ sendChatMessage }) => {
            if (sendChatMessage) {
                updateCache(sendChatMessage)
                setInputs({ message: "" });
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                chatId: chat._id,
                from_username: user.username
            }
        })
    }

    return <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} />
}

export default ChatSendMessage;
