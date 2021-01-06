import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import IconButton from '../layout/buttons/IconButton';

const CustomModal = ({ 
    modal_title, 
    modal_footer, 
    modal_size, 
    modal_class, 
    btn_title, 
    btn_class, 
    children, 
    displayWithoutBtn, 
    onClose }) => {
    const [open, setOpen] = useState(displayWithoutBtn ? true : false);

    const handleClose = () => {
        onClose && onClose();
        setOpen(false);
    };

    if (!open) return <Button variant="" className={btn_class} onClick={() => setOpen(true)}>{btn_title}</Button>
    return (
        <Modal show={open} onHide={handleClose}
            size={modal_size || "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={`customModal ${modal_class}__wrapper`}
            centered

        >
            {modal_title && <Modal.Header className="customModal__header" closeButton={false} >
                <Modal.Title>{modal_title}</Modal.Title>
                <IconButton onClick={handleClose} icon_class="customModal__close" />
            </Modal.Header>}
            <Modal.Body scrollable="true"> {children}</Modal.Body>
            {modal_footer && <Modal.Footer className="customModal__footer">{modal_footer}</Modal.Footer>}
        </Modal>
    );
}

export default CustomModal
