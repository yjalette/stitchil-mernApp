import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({ input_props }) => (
    <>
        {/* {input_props.required && <span className="text-muted">*</span>} */}
        <Form.Control
            className={`${input_props.required && "user-input-required"} user-input`}
            type={input_props.type || "text"}
            {...input_props}
        />
    </>
)

export default FormInput;

