import React from 'react'
import { Form } from 'react-bootstrap'

import "./style.css"

import SubmitButton from '../layout/buttons/SubmitButton';
import CancelButton from '../layout/buttons/CancelButton';
import InlineAlert from './alerts/InlineAlert';
import GroupButton from './buttons/GroupButton';

const CustomForm = ({ form_class, form_msg, form_error, submitTitle, onSubmit, onCancel, children }) => (
    <Form className={`customForm ${form_class}`} onSubmit={onSubmit}>
        {form_error && <InlineAlert content={form_error} variant="danger" alert_class="alert-danger" />}
        {form_msg && <InlineAlert content={form_msg} variant="success" alert_class="alert-success" />}
        {children}
        <GroupButton group_class="customForm__groupButton">
            {onCancel && <CancelButton title="clear" onCancel={onCancel} />}
            <SubmitButton onSubmit={onSubmit} title={submitTitle} />
        </GroupButton>
    </Form>
)
export default CustomForm
