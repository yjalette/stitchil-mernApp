
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useToggle } from '../../custom_hooks/useToggle'
import { DELETE_SINGLE_FILE_MUTATION } from './graphql/mutations'
import CustomButton from '../../layout/button/CustomButton'
import CustomModal from '../../layout/CustomModal'
import "./style.css"

const FileDelete = ({ onCompleted, public_id, children }) => {
    const [isDeleted, toggle] = useToggle(false)
    const [deleteFile] = useMutation(DELETE_SINGLE_FILE_MUTATION, {
        onCompleted: async data => {
            if (data) {
                toggle(true)
                onCompleted()
            }
        }
    })

    const handleDelete = () => {
        deleteFile({
            variables: { public_id }
        })
    }

    // if (!open) return (
    //     <div className="fileMultiUpdate">
    //         <CustomButton
    //             onClick={toggle}
    //             btn_class="
    //         btn-icon
    //         fas fa-trash
    //         red 
    //         position-center
    //         fileDeleteBtn
    //   "
    //         >

    //         </CustomButton>
    //         {children}
    //     </div>
    // )

    return (
        <CustomModal
            modal_title="confirm deletion"
            modal_size="sm"
            btn_class="
            btn-icon
            fas fa-trash
            red 
            position-center
            fileDeleteBtn"


        >
            <>
                {isDeleted && <h5>deleted!</h5>}
                {!isDeleted && <>
                    <h6>Delete this item?</h6>
                    <CustomButton
                        btn_class="btn-click red"
                        onClick={handleDelete}>
                        delete
                    </CustomButton>
                </>}
            </>
        </CustomModal>
    )
}


export default FileDelete
