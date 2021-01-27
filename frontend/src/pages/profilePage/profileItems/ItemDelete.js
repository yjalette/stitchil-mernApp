import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import "./style.css"
import CustomModal from '../../../layout/CustomModal';
import CustomButton from '../../../layout/button/CustomButton';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { DELETE_GIG_MUTATION, DELETE_PRODUCT_MUTATION } from '../graphql/mutations';

const ItemDelete = ({ itemId, postCache }) => {
    const { section } = useParams();
    const { post, data, error } = useMutationHook(section === "gigs" ? DELETE_GIG_MUTATION : DELETE_PRODUCT_MUTATION);

    const handleDelete = () => {
        post({ variables: { itemId } });
        postCache(itemId);
    };

    return (
        <CustomModal
            btn_class="fa fa-trash btn-icon btn-icon-red"
            modal_title="Confirm Deletion"
            modal_size="md"
            modal_class="postModal" >
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
