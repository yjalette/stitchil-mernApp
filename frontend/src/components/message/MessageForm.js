import React from 'react';
import { Media } from 'react-bootstrap';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';
import FormTextarea from '../inputs/FormTextarea';

const MessageForm = ({ inputs, onSubmit, onChange, children, msg_class }) => (
    <Media className={`messageForm__wrapper ${msg_class}`}>
        {children}
        <CustomForm form_class="messageForm" submitTitle="send" onSubmit={onSubmit}>
            {inputs.subject && <FormInput label="subject" value={inputs.subject} onChange={onChange} />}
            <FormTextarea label="message" value={inputs.message} placeholder="write here ..." onChange={onChange} maxLength="300" />
            {/* <CustomButton onClick={handleSubmit} btn_class="btn-icon w-auto" icon="fa fa-paper-plane" /> */}
        </CustomForm>
    </Media>
)

export default MessageForm;




