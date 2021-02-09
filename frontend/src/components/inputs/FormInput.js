import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({ label, value, type, placeholder, elem_class, tooltip, onChange, error, validate, required, pattern }) => (
    <Form.Group className={`field-wrapper ${elem_class}`} >
        {label && <Form.Label title={tooltip} className="formLabel">{label.toLowerCase()}{required && "*"}</Form.Label>}
        <Form.Control
            className={`field-wrapper__input user-input ${error && `user-input-error`}`}
            type={type ? type : "text"}
            title={tooltip}
            value={value || ""}
            name={label || ""}
            pattern={pattern}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={() => validate && validate({ [label]: value })}
        />
        {error && <span className="error">{error}</span>}
    </Form.Group>
)

export default FormInput;
