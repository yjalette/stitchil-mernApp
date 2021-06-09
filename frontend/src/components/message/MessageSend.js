import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router';
import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';
import MessageSendForm from './MessageSendForm';

const MessageSend = ({ chatId }) => {
    const { username } = useParams();
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
        onCompleted: async ({ send_chat_message }) => {
            if (send_chat_message) {
                if (!chatId) return window.location.reload()
                setInputs({ message: "" });
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                chatId,
                recipient: username
            }
        })
    }

    return <MessageSendForm
        inputs={inputs}
        onChange={handleChange}
        onSubmit={handleSubmit} />
}

export default MessageSend;
