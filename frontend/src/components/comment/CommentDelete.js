import React from 'react'
import useDeleteData from '../../custom_hooks/useDeleteData'
import CustomButton from '../../layout/button/CustomButton';
import GroupButton from '../../layout/button/GroupButton';
import CustomModal from '../../layout/CustomModal'

const CommentDelete = ({ itemId, onDelete }) => {
    const { deleteItem, data, error } = useDeleteData("deletecomment", onCompleted);

    const handleDelete = () => {
        deleteItem(itemId)
    }

    function onCompleted(data) {
        if (data && !error) onDelete();
    }

    return (
        <CustomModal
            btn_class="fa fa-trash btn-icon btn-icon-red"
            modal_class="deleteComment"
            modal_title="delete comment"
            modal_size="md"
        >
            <span className="deleteComment__title ">{!data && !error ? "Delete This Item?" : "Item Was Succefully Deleted."} </span>
            { !data && <GroupButton group_class="deleteComment__groupButtons">
                <a href="#" className="deleteComment__button-wrapper" onClick={handleDelete}>
                    <CustomButton btn_class="btn-click btn-red deleteComment__button">delete</CustomButton></a>
                {/* <a href="#" className="deleteComment__button-wrapper" onClick={() => setOpen(false)}>
                        <CancelButton title="cancel" btn_class="deleteComment__button" /></a> */}
            </GroupButton>}
        </CustomModal>
    )
}

export default CommentDelete
