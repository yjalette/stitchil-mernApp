import React from 'react';
import CustomForm from '../../layout/CustomForm'

const ItemForm = ({ onSubmit, onCancel, children }) => {
    return (
        <CustomForm form_class="item__form h-100 w-100" submitTitle="save" onSubmit={onSubmit} onCancel={onCancel}>
            {children}
        </CustomForm>
    )
}

export default ItemForm
