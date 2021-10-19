import React from 'react';
import { Form } from 'react-bootstrap';
import './inputs.css';

const SelectInput = ({ input_props, defaultValue, options, disabled }) => (
    <Form.Control
        as="select"
        className="customSelect user-input"
        {...input_props}
    >
        <option value="" className="dropdown-item default" defaultValue>{defaultValue ? defaultValue : "select"}</option>
        {options.map((opt, i) => {
            return <option
                key={opt + i}
                value={opt}
                className="dropdown-item"
                disabled={disabled}
            >{opt}
            </option>
        })}
    </Form.Control>
)

export default SelectInput

