
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useToggle } from '../../custom_hooks/useToggle'
import { DELETE_SINGLE_FILE_MUTATION } from './graphql/mutations'
import CustomButton from '../../layout/button/CustomButton'
import "./style.css"

const FileDelete = ({ onDelete, public_id }) => {
    // const [isDeleted, toggle] = useToggle(false)
    const [deleteFile] = useMutation(DELETE_SINGLE_FILE_MUTATION, {
        onCompleted: data => {
            if (data) {
                onDelete()
                // toggle(true)
            }
        }
    })

    const handleDelete = () => {
        console.log(public_id)
        deleteFile({
            variables: { public_id }
        })
    }

    // if (isDeleted) return null

    return (
        <CustomButton
            btn_class="
            btn-icon
            fas fa-trash
            red 
            position-center
            fileDeleteBtn"
            onClick={handleDelete}
        ></CustomButton>
    )
}

export default FileDelete
