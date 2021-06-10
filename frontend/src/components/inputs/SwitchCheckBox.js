import React from 'react';

import { Form } from 'react-bootstrap';

const SwitchCheckBox = ({ label, value, onChange }) => (
    <Form.Check
        type="switch"
        id="custom-switch"
        label={label}
        onChange={(e) => console.log(e.target.checked) || onChange}
        checked={value ? value : true}
        custom
    />
)

export default SwitchCheckBox
