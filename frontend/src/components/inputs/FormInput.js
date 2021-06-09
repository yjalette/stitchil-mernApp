import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({ input_props }) => {
    const { type } = input_props;
    return (
        <>
            {/* {input_props.required && <span className="text-muted">*</span>} */}
            <Form.Control
                className="user-input"
                type={type ? type : "text"}
                {...input_props}
            />
        </>
    )
}

export default React.memo(FormInput);

