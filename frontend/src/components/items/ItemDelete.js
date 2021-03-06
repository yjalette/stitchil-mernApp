import React from 'react';
import { Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

import "./style.css"
import CustomModal from '../../layout/CustomModal';
import CustomButton from '../../layout/button/CustomButton';
import { useToggle } from '../../custom_hooks/useToggle';

const ItemDelete = ({ itemId, deleteItemCache, mutation }) => {
    const [open, toggle] = useToggle(false)
    const [post] = useMutation(mutation, {
        onCompleted: async data => {
            await deleteItemCache(itemId);
            toggle()
        }
    });

    const handleDelete = () => post({ variables: { itemId } });

    if (!open) {
        return <CustomButton
            btn_class="btn-icon btn-icon-red"
            icon="fas fa-trash"
            btn_otherProps={{
                title: "delete"
            }}
            onClick={toggle} />
    }

    return (
        <CustomModal
            modal_title="Confirm Deletion"
            modal_size="md"
            modal_class="postModal"
            displayWithoutBtn={true}
        >
            <Modal.Body className="p-3 d-flex flex-column">
                <h6 className="postModal__title">Are you sure to delete this item? </h6>
                <a href="#" className="postModal__button-wrapper" onClick={handleDelete}>
                    <CustomButton btn_class="btn-click postModal__button float-right" >delete</CustomButton>
                </a>
            </Modal.Body>
        </CustomModal>
    )

}
export default React.memo(ItemDelete)
