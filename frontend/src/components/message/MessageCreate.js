import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import "./style.css";
import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import MessageForm from './MessageForm';

const MessageCreate = ({ query, otherVariables, onMessageSent, children, msg_class }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post, { error, data }] = useMutation(query, {
        onCompleted: data => {
            if (onMessageSent) onMessageSent({
                _id: 0,
                message: inputs.message,
                sender: { profileImage: user.profileImage || "", username: user.username, __typename: "" },
                createdAt: new Date(),
                ...otherVariables,
                __typename: ""
            });
            setInputs({ message: "" });
        }
    });

    function onSubmit() {
        post({ variables: { message: inputs.message, ...otherVariables } })
    }

    return <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} msg_class={msg_class}>{children}</MessageForm>
}

export default MessageCreate;
