import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./style.css"
import GroupButton from './button/GroupButton';
import CustomButton from './button/CustomButton';
import CustomAlert from './CustomAlert';

const CustomForm = ({ form_class, form_msg, form_error, submitTitle, onSubmit, onCancel, children }) => console.log(form_error) || (
    <Form className={`customForm ${form_class}`} onSubmit={onSubmit}>
        {form_error && <CustomAlert alert_variant="danger">{form_error} </CustomAlert>}
        {form_msg && <CustomAlert>{form_msg} </CustomAlert>}
        {children}
        <GroupButton group_class="customForm__groupButton">
            {onCancel && <CustomButton onClick={onCancel} btn_class="btn-form btn-form-cancel">cancel</CustomButton>}
            <Button type="submit" onSubmit={onSubmit} className="btn-form">{submitTitle || "submit"}</Button>
        </GroupButton>
    </Form>
)
export default CustomForm
