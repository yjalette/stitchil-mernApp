import React from 'react';
import { Alert } from 'react-bootstrap'

import { useToggle } from '../../custom_hooks/useToggle';
import ClickButton from '../buttons/ClickButton';

const AlertDismissible = ({ alert_class, heading, text, onClick, btn_title, children }) => {
    const [open, toggle] = useToggle(true);

    const handleClick = () => {
        onClick();
        toggle();
    }

    return (
        <>
            <Alert show={open} variant="" className={`${alert_class} alert-dis`}>
                <Alert.Heading>{heading}</Alert.Heading>
                <p className={`${alert_class}__text`}>{text}</p>
                {children}
                {btn_title && <div className="d-flex justify-content-end">
                    <ClickButton onClick={handleClick} variant="" btn_title={btn_title} />
                </div>}
            </Alert>
            {/* {!open && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
        </>
    );
}

export default AlertDismissible
