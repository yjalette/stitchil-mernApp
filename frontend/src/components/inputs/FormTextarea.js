import React from 'react';
import { Form } from 'react-bootstrap';

const FormTextarea = ({ label, value, placeholder, elem_class, tooltip, onChange, error, validate, rows, required }) => (
    <Form.Group className={`field-wrapper ${elem_class}`} >
        {label && <Form.Label title={tooltip} className="formLabel">{label.toLowerCase()}{required && "*"}</Form.Label>}
        <Form.Control
            className={`field-wrapper__input user-input ${error && `user-input-error`}`}
            as="textarea"
            title={tooltip}
            value={value || ""}
            name={label || ""}
            required={required ? true : false}
            placeholder={placeholder}
            onChange={onChange}
            rows={rows || 3}
            onBlur={() => validate && validate({ [label]: value })}
        />
        {error && <span className="error">{error}</span>}
    </Form.Group>
)

export default FormTextarea;
