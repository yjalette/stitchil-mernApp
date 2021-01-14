import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import "./style.css"
import useDeleteData from '../../../custom_hooks/useDeleteData';
import SubmitButton from '../../../layout/buttons/SubmitButton';
import CustomModal from '../../../layout/CustomModal';
import ProfileItemContext from '../../../context/ProfileItem-context';

const ItemDelete = ({ itemId }) => {
    const { section } = useParams();
    const { deleteItemCache } = useContext(ProfileItemContext);
    const { deleteItem, data, error } = useDeleteData(section);

    const handleDelete = () => {
        deleteItem({ variables: { itemId } });
        deleteItemCache(itemId);
    };

    return (
        <CustomModal
            btn_class="fa fa-trash redIcon customIcon"
            modal_title="Confirm Deletion"
            modal_size="md"
            modal_class="deleteItemModal" >
            <Modal.Body className="p-3 d-flex flex-column">
                <h6 className="deleteItemModal__title">Are you sure to delete this item? </h6>
                <a href="#" className="deleteItemModal__button-wrapper" onClick={handleDelete}>
                    <SubmitButton title="delete" btn_class="deleteItemModal__button float-right" /></a>
            </Modal.Body>
        </CustomModal>
    )

}
export default React.memo(ItemDelete)
