import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import "./style.css";
import useForm from '../../custom_hooks/useForm';
import MessageForm from './MessageForm';

const MessageCreate = ({ mutation, otherVariables, onMessageSent, children, msg_class }) => {
    const { username } = useParams()
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(mutation, {
        onCompleted: data => {
            if (onMessageSent) onMessageSent(data, otherVariables);
            setInputs({ message: "" });
        }
    });

    function onSubmit() {
        post({ variables: { message: inputs.message, recipient: username, ...otherVariables } })
    }

    return <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} msg_class={msg_class}>{children}</MessageForm>
}

export default MessageCreate;
