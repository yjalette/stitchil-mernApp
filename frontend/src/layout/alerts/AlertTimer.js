import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';

const AlertTimer = ({ heading, text, duration, alert_class }) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setOpen(false), duration);
        return () => clearTimeout(timeout);
    }, [duration])

    if (!open) return null

    return (
        <Modal
            show={open}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="alertTimer__wrapper"
            centered>
            <Alert className={`${alert_class} alertTimer flex-center flex-column`} variant="">
                {heading && <h5 className="alertTimer__heading w-100">{heading}</h5>}
                <p className="alertTimer__text text">{text}</p>
            </Alert>
        </Modal>
    )
}

export default AlertTimer