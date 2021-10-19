import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';

const MessageForm = ({ inputs, onSubmit, onChange, children, mod_class }) => (
    <>
        {children}
        <CustomForm form_class={`messageForm messageForm--${mod_class}`} submitTitle="send" onSubmit={onSubmit}>
            {inputs.subject && <FormInput name="subject" value={inputs.subject} onChange={onChange} />}
            <InputGroup className="messageForm__inputWrap">
                <FormInput input_props={{
                    name: "message",
                    value: inputs.message,
                    as: "textarea",
                    rows: "3",
                    placeholder: "max 100 characters",
                    onChange,
                    maxLength: "100"
                }} />
                <InputGroup.Prepend>
                    <Button variant="" className="text-white" type="submit" onSubmit={onSubmit}>send</Button>
                </InputGroup.Prepend>
            </InputGroup>
        </CustomForm>
    </>
)

export default MessageForm;




