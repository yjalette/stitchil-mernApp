import React from 'react';

import { Form } from 'react-bootstrap';

const SwitchCheckBox = ({ label, value, handleChange }) => {
    return (
        <Form.Check
            type="switch"
            id="custom-switch"
            label={label}
            onChange={(e) => console.log(e.target.checked)}
            checked={true}
            custom
        />
    )
}

export default SwitchCheckBox
