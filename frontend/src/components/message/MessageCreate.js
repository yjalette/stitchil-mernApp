import React, { useContext } from 'react';

import "./style.css";
import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import MessageForm from './MessageForm';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';

const MessageCreate = ({ docId, addMessage, children }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const { post } = useMutationHook(CREATE_MESSAGE_MUTATION, onPostCompleted);

    function onPostCompleted() {
        addMessage({ message: inputs.message, sender: { profileImage: user.profileImage, username: user.username }, docId });
        setInputs({ message: "" });
    }

    function onSubmit() {
        post({ variables: { message: inputs.message, docId } })
    }

    console.log(docId)
    return (
        <MessageForm onChange={handleChange} onSubmit={handleSubmit} message={inputs.message} >
            {children}
        </MessageForm>
    )
}

export default MessageCreate;
