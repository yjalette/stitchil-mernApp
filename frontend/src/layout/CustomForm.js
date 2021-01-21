import React from 'react'
import { Form } from 'react-bootstrap'
import "./style.css"
import InlineAlert from './alerts/InlineAlert';
import GroupButton from './button/GroupButton';
import CustomButton from './button/CustomButton';

const CustomForm = ({ form_class, form_msg, form_error, submitTitle, onSubmit, onCancel, children }) => (
    <Form className={`customForm ${form_class}`} onSubmit={onSubmit}>
        {form_error && <InlineAlert content={form_error} variant="danger" alert_class="alert-danger" />}
        {form_msg && <InlineAlert content={form_msg} variant="success" alert_class="alert-success" />}
        {children}
        <GroupButton group_class="customForm__groupButton">
            {onCancel && <CustomButton onClick={onCancel} btn_class="btn-form btn-form-cancel">clear</CustomButton>}
            <CustomButton type="submit" onClick={onSubmit} btn_class="btn-form">{submitTitle}</CustomButton>
        </GroupButton>
    </Form>
)
export default CustomForm
