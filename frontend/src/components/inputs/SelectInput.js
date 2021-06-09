import React from 'react';
import { Form } from 'react-bootstrap';
import './inputs.css';

const SelectInput = ({ input_props, defaultValue, options }) => (
    <div className="customSelect__wrapper " >
        <Form.Control as="select" {...input_props} className="customSelect user-input">
            <option value="" defaultValue>{defaultValue ? defaultValue : "select"}</option>
            {options.map(opt => <option key={opt} value={opt} className="dropdown-item" >{opt}</option>)}
        </Form.Control>
        <span className="customSelect__arrow"></span>
    </div>
)

export default SelectInput

