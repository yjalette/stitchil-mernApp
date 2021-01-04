import React from 'react';
import { Form } from 'react-bootstrap';

import './inputs.css';

const SelectInput = ({ label, options, onChange, defaultValue, error, className, required }) => {
    return (
        <Form.Group className={`field-wrapper field-wrapper-select ${className}`} >
            {label && <Form.Label className="formLabel">{label}</Form.Label>}
            {error && <span className="error">error: {error}</span>}
            <div className="customSelect__wrapper " >
                <Form.Control as="select" name={label} onChange={onChange} className="customSelect user-input" required={required ? true : false}>
                    <option defaultValue>{defaultValue ? defaultValue : "select"}</option>
                    {options.map(opt => <option key={opt} name={opt} value={opt} className="dropdown-item">{opt}</option>)}
                </Form.Control>
                <span className="customSelect__arrow"></span>
            </div>
        </Form.Group>
    )
}

export default SelectInput

