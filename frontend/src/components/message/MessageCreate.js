import React, { useContext } from 'react';

import "./style.css";
import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import MessageForm from './MessageForm';
import useMutationHook from '../../custom_hooks/useMutationHook';

const MessageCreate = ({ query, otherVariables, docId, addMessage, children }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const { post } = useMutationHook(query, onPostCompleted);

    function onPostCompleted() {
        addMessage({
            _id: 0,
            message: inputs.message,
            sender: { profileImage: user.profileImage || "", username: user.username, __typename: "" },
            createdAt: new Date(),
            __typename: "",
            docId, ...otherVariables
        });
        setInputs({ message: "" });
    }

    function onSubmit() {
        post({ variables: { message: inputs.message, ...otherVariables } })
    }

    return (
        <MessageForm onChange={handleChange} onSubmit={handleSubmit} message={inputs.message} >
            {children}
        </MessageForm>
    )
}

export default MessageCreate;
