import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./style.css"
import InlineAlert from './alerts/InlineAlert';
import GroupButton from './button/GroupButton';
import CustomButton from './button/CustomButton';

const CustomForm = ({ form_class, form_msg, form_error, submitTitle, onSubmit, onCancel, children }) => (
    <Form className={`customForm ${form_class}`} onSubmit={onSubmit}>
        {form_error && <InlineAlert content={form_error} variant="danger" alert_class="alert-danger" />}
        {form_msg && <InlineAlert content={form_msg} variant="success" alert_class="alert-success" />}
        {children}
        {onSubmit && <GroupButton group_class="customForm__groupButton">
            {onCancel && <CustomButton onClick={onCancel} btn_class="btn-form btn-form-cancel">cancel</CustomButton>}
            <Button type="submit" onSubmit={onSubmit} className="btn-form">{submitTitle || "submit"}</Button>
        </GroupButton>}
    </Form>
)
export default CustomForm
