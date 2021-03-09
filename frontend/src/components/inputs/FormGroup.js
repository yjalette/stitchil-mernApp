import React from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = ({ elem_class, label, tooltip, required, error, input_component }) => {
    return (
        <Form.Group className={`field-wrapper ${elem_class} ${error && `field-wrapper-error`}`} >
            {label && <Form.Label title={tooltip} className="formLabel">{label}{required && "*"}</Form.Label>}
            {input_component}
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )
}

export default FormGroup
