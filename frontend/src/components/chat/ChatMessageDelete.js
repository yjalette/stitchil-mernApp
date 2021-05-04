import React from 'react'
import { useMutation } from '@apollo/react-hooks';
// import useForm from '../../custom_hooks/useForm';
import { DELETE_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import CustomButton from '../../layout/button/CustomButton';

const ChatMessageDelete = ({ messageId, onMessageDelete }) => {
    const [post] = useMutation(DELETE_CHAT_MESSAGE_MUTATION);

    const handleDelete = () => {
        console.log(messageId)
        post({
            variables: { messageId }
        })
        onMessageDelete(messageId)
    }

    return <CustomButton onClick={handleDelete} btn_class="btn-text red">delete</CustomButton>
}

export default ChatMessageDelete
