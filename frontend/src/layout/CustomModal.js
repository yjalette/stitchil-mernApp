import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CustomButton from './button/CustomButton';

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

    if (!open) return <CustomButton onClick={() => setOpen(true)} btn_class={btn_class}>{btn_title}</CustomButton>

    return (
        <Modal show={open} onHide={handleClose}
            size={modal_size || "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={`customModal ${modal_class}__wrapper`}
            centered

        >
            {modal_title && <Modal.Header className="customModal__header" closeButton={false} >
                <Modal.Title>{modal_title}</Modal.Title>
                <CustomButton onClick={handleClose} btn_class="btn-close" />
            </Modal.Header>}
            <Modal.Body scrollable="true"> {children}</Modal.Body>
            {modal_footer && <Modal.Footer className="customModal__footer">{modal_footer}</Modal.Footer>}
        </Modal>
    );
}

export default CustomModal
