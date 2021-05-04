import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from '../../custom_hooks/useForm';
import ChatMessageForm from './ChatMessageForm';
import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';

const ChatMessageSend = ({ chatId, member, addMessage }) => {
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
        onCompleted: async ({ send_chat_message }) => {
            if (send_chat_message) {
                addMessage(send_chat_message)
                setInputs({ message: "" });
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                chatId,
                recipient: member
            }
        })
    }

    return <ChatMessageForm
        inputs={inputs}
        onChange={handleChange}
        onSubmit={handleSubmit} />
}

export default ChatMessageSend;
