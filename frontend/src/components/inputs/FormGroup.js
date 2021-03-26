import React from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = ({ label, tooltip, required, error, input_component }) => {
    return (
        <Form.Group className={`field-wrapper group-${label} ${error && `field-wrapper-error`}`} >
            {label && <Form.Label title={tooltip} className="formLabel">{label}{required && "*"}</Form.Label>}
            {input_component}
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )
}

export default FormGroup
