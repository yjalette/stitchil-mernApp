import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';
import MessageSendForm from './MessageSendForm';
import AuthContext from '../../context/Auth-context';

const MessageSend = ({ chatId, updateCacheNewChat }) => {
    const { user } = useContext(AuthContext)
    const { username } = useParams();
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
        onCompleted: async ({ send_chat_message }) => {
            if (send_chat_message) {
                if (!chatId) updateCacheNewChat({
                    _id: send_chat_message.chatId,
                    chatId: send_chat_message.chatId,
                    member: username,
                    lastMessages: [send_chat_message]
                })
                setInputs({ message: "" });
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                chatId,
                to_username: username,
                from_username: user.username
            }
        })
    }

    return <MessageSendForm
        inputs={inputs}
        onChange={handleChange}
        onSubmit={handleSubmit} />
}

export default MessageSend;
