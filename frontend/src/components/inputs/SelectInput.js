import React from 'react';
import { Form } from 'react-bootstrap';
import './inputs.css';

const SelectInput = ({ label, options, onChange, defaultValue, error, className, required, multiple }) => (
    <Form.Group className={`field-wrapper field-wrapper-select ${className}`} >
        {label && <Form.Label className="formLabel">{label}{required && "*"}</Form.Label>}
        <div className="customSelect__wrapper " >
            <Form.Control as="select" name={label} onSelect={e => console.log(e)} className="customSelect user-input" required={required} multiple={multiple}>
                <option value="" defaultValue>{defaultValue ? defaultValue : "select"}</option>
                {options.map(opt => <option key={opt} name={label} eventKey={opt} className="dropdown-item" >{opt}</option>)}
            </Form.Control>
            <span className="customSelect__arrow"></span>
        </div>
        { error && <span className="error">error: {error}</span>}
    </Form.Group >
)

export default SelectInput

