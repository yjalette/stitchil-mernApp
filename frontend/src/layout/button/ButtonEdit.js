import React from 'react'
import CustomButton from './CustomButton'

const ButtonEdit = ({ onClick }) => {
    return (
        <CustomButton
            onClick={onClick}
            icon="fas fa-pencil-alt"
            btn_class="btn-icon-text"
            btn_otherProps={{
                title: "edit"
            }}
        />
    )
}

export default ButtonEdit
