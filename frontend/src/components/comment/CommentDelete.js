import React from 'react'
import useDeleteData from '../../custom_hooks/useDeleteData'
import SubmitButton from '../../layout/buttons/SubmitButton';
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
            btn_class="fa fa-trash redIcon"
            modal_class="deleteComment"
            modal_title="delete comment"
            modal_size="md"
        >
            <span className="deleteComment__title ">{!data && !error ? "Delete This Item?" : "Item Was Succefully Deleted."} </span>
            {!data && <section className="deleteComment__groupButtons groupButtons ">
                <a href="#" className="deleteComment__button-wrapper" onClick={handleDelete}>
                    <SubmitButton title="delete" btn_class="deleteComment__button" /></a>
                {/* <a href="#" className="deleteComment__button-wrapper" onClick={() => setOpen(false)}>
                        <CancelButton title="cancel" btn_class="deleteComment__button" /></a> */}
            </section>}
        </CustomModal>
    )
}

export default CommentDelete
// fa fa-trash redIcon