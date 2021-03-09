import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';

const MessageForm = ({ inputs, onSubmit, onChange, children, msg_class }) => (
    <>
        {children}
        <CustomForm form_class={`${msg_class} messageForm`} submitTitle="send" onSubmit={onSubmit}>
            {inputs.subject && <FormInput name="subject" value={inputs.subject} onChange={onChange} />}
            <InputGroup className="messageForm__inputWrap">
                <FormInput input_props={{
                    name: "message",
                    value: inputs.message,
                    as: "textarea",
                    rows: "3",
                    placeholder: "max 300 characters",
                    onChange,
                    maxLength: "300"
                }} />
                <InputGroup.Prepend>
                    <Button variant="" className="text-white" type="submit" onSubmit={onSubmit}>send</Button>
                </InputGroup.Prepend>
            </InputGroup>
        </CustomForm>
    </>
)

export default MessageForm;




