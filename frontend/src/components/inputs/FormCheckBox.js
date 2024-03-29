import React from 'react';

import { Form } from 'react-bootstrap';

const FormCheckBox = ({ name, label, value, type, onChange }) => console.log(value) || (
    <Form.Check
        type={type || "checkbox"}
        id="custom-switch"
        label={label || name}
        name={name}
        onChange={onChange}
        value={value}
        checked={value}
        custom
    />
)

export default FormCheckBox
