import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from './button/CustomButton';

const CustomModal = ({
    modal_title,
    modal_footer,
    modal_size,
    modal_class,
    btn_class,
    btn_otherProps,
    btn_title,
    children,
    displayWithoutBtn,
    onClose,
    timeOut }) => {

    const [open, setOpen] = useState(displayWithoutBtn);

    useEffect(() => {
        if (timeOut) setTimeout(() => setOpen(false), timeOut)
    }, [timeOut])

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        onClose && onClose();
        setOpen(false);
    }

    if (!open && !displayWithoutBtn) {
        return <CustomButton
            onClick={handleOpen}
            btn_class={btn_class}
            btn_otherProps={btn_otherProps}>
            {btn_title}</CustomButton>
    }
    return (
        <Modal
            show={open} onHide={handleClose}
            size={modal_size || "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={`customModal ${modal_class}`}
            backdrop="static"
            centered
        >
            <Modal.Header className="customModal__header" closeButton={false} >
                <Modal.Title>{modal_title}</Modal.Title>
                <CustomButton
                    onClick={handleClose}
                    btn_class="btn-icon-plain fas fa-times customModal__btn-close" />
            </Modal.Header>
            <Modal.Body scrollable="true"> {children}</Modal.Body>
            {modal_footer && <Modal.Footer className="customModal__footer">{modal_footer}</Modal.Footer>}
        </Modal>
    );
}

export default CustomModal
