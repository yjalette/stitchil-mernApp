import React, { memo } from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = ({ label, tooltip, required, error, input_component, user_msg }) => {
    return (
        <Form.Group className={`field-wrapper group-${label} ${error && `field-wrapper-error`}`} >
            {label && <Form.Label title={tooltip} className="formLabel">{label}{required && "*"}</Form.Label>}
            {input_component}
            {user_msg && <span className="text-muted small">{user_msg}</span>}
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )
}

export default memo(FormGroup)
