import React from 'react';

import { Form } from 'react-bootstrap';

const SwitchCheckBox = ({ label, value, onChange }) => (
    <Form.Check
        type="switch"
        id="custom-switch"
        label={label}
        onChange={({ target }) => console.log(target)}
        checked={value ? value : true}
        custom
    />
)

export default SwitchCheckBox
