import React, { useContext } from 'react';
import { Col, Form, Media, Row } from 'react-bootstrap';

import "./style.css";
import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import CustomButton from '../../layout/button/CustomButton';
import FormTextarea from '../inputs/FormTextarea';
import useMutationHook from '../../custom_hooks/useMutationHook';

const MessageCreate = ({ query, otherVariables, onMessageSent, children, msg_class }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const { post } = useMutationHook(query, onPostCompleted);

    function onPostCompleted() {
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

    function onSubmit() {
        post({ variables: { message: inputs.message, ...otherVariables } })
    }

    return (
        <Media className={`messageForm-wrapper ${msg_class}`}>
            <Form className="messageForm d-flex flex-column">
                {children}
                <Row className="flex-center messageForm__body">
                    <Col xs={10}>
                        <FormTextarea label="message" value={inputs.message} placeholder="write here ..." onChange={handleChange} />
                    </Col>
                    <Col xs={2}>
                        <CustomButton onClick={handleSubmit} btn_class="btn-icon w-auto" icon="fa fa-paper-plane" />
                    </Col>
                </Row>
            </Form>
        </Media>
    )
}

export default MessageCreate;
