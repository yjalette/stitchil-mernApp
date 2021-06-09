import React from 'react';
import { Form } from 'react-bootstrap';
import { useToggle } from '../../custom_hooks/useToggle';

const Password = ({ name, value, error, validate, onChange }) => {
    const [open, toggle] = useToggle(false);
    return (
        <Form.Group className="field-wrapper passwordWrapper">
            {error && <span className="error">{error}</span>}
            <Form.Label className="formLabel passwordWrapper__label">
                {name.replace("_", " ")}*
            <i className={open ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => toggle()} />
            </Form.Label>
            <Form.Control
                className="user-input"
                value={value}
                type={!open ? "password" : "text"}
                name={name}
                onChange={onChange}
                onBlur={() => validate && validate({ [name]: value })} required />
        </Form.Group>
    )

}
// {label.replace(/Password/g, " password")}
export default React.memo(Password);


