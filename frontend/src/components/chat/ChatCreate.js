import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { useParams } from 'react-router';
import useForm from '../../custom_hooks/useForm';
import ChatMessageForm from './ChatMessageForm';
import { CREATE_CHAT_MUTATION } from './graphql/mutations';

const ChatCreate = ({ onMessageSent }) => {
    const { username } = useParams()
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(CREATE_CHAT_MUTATION, {
        onCompleted: data => {
            if (onMessageSent) onMessageSent(data.chat_message_send);
            return setInputs({ message: "" });
        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                recipient: username,
                chatId
            }
        })
    }

    return <ChatMessageForm
        inputs={inputs}
        onChange={handleChange}
        onSubmit={handleSubmit} />
}

export default ChatCreate;
