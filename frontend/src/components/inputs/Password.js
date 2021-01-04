import React from 'react';
import { Form } from 'react-bootstrap';

import { useToggle } from '../../custom_hooks/useToggle';

const Password = ({ label, value, error, validate, onChange }) => {
    const [open, toggle] = useToggle(false);
    return (
        <Form.Group className="field-wrapper passwordWrapper">
            <Form.Label className="formLabel passwordWrapper__label">{label.replace(/Password/g, " password")}* <i className={open ? "fa fa-eye" : "fa fa-eye-slash"} onClick={toggle} /></Form.Label>
            <Form.Control className="user-input" value={value} type={!open ? "password" : "text"} name={label} onChange={onChange} onBlur={() => validate && validate({ [label]: value })} required />
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )

}

export default React.memo(Password);


