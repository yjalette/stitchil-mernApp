import React from 'react'
import { Form, Button } from 'react-bootstrap'

import GroupButton from './button/GroupButton';
import CustomButton from './button/CustomButton';
import CustomAlert from './CustomAlert';
import "./style.css"

const CustomForm = ({
    form_class,
    form_msg,
    form_error,
    submitTitle,
    cancelTitle,
    onSubmit,
    onCancel,
    children }) => (
    <Form
        className={`customForm ${form_class}`}
        onSubmit={onSubmit}
    >
        {form_error && <CustomAlert alert_variant="danger">{form_error} </CustomAlert>}
        {form_msg && <CustomAlert>{form_msg} </CustomAlert>}
        {children}
        <GroupButton group_class="customForm__groupButton">
            {onCancel && <CustomButton onClick={onCancel} btn_class="btn-form cancel">{cancelTitle || "cancel"}</CustomButton>}
            <Button
                type="submit"
                className="btn-form"
                onSubmit={onSubmit}>
                {submitTitle || "submit"}
            </Button>
        </GroupButton>
    </Form>
)
export default CustomForm
