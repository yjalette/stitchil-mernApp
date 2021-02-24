import React, { useContext } from 'react';
import { Media } from 'react-bootstrap';
import "./style.css";
import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import FormTextarea from '../inputs/FormTextarea';
import CustomForm from '../../layout/CustomForm';
import { useMutation } from '@apollo/react-hooks';

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

    return (
        <Media className={`messageForm__wrapper ${msg_class}`}>
            {children}
            <CustomForm form_class="messageForm" submitTitle="send" onSubmit={handleSubmit}>
                <FormTextarea label="message" value={inputs.message} placeholder="write here ..." onChange={handleChange} />
                {/* <CustomButton onClick={handleSubmit} btn_class="btn-icon w-auto" icon="fa fa-paper-plane" /> */}
            </CustomForm>
        </Media>
    )
}

export default MessageCreate;
