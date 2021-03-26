import React from 'react';

import { Form } from 'react-bootstrap';

const FormCheckBox = ({ label, value, type, onChange }) => (
    <Form.Check
        type={type || "checkbox"}
        id="custom-switch"
        label={label}
        onChange={onChange}
        checked={value}
        custom
    />
)

export default FormCheckBox
