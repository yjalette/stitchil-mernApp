import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';

import ItemForm from './ItemForm';
import { initState, transformInputs, validate } from "./helpers"
import useForm from '../../custom_hooks/useForm';
import useUpload from '../../custom_hooks/useUpload';
import CustomButton from '../../layout/button/CustomButton';

const ItemCreate = ({ mutation, addItemCache }) => {
    const { section } = useParams();
    const [post, { error }] = useMutation(mutation, { onCompleted: data => clearForm() });
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, editMode, toggleEditMode, errors, setErrors } = useForm(initState[section], onSubmit);
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);

    async function onSubmit() {
        const emptyInputs = validate({ ...inputs, files });
        if (emptyInputs.length > 0) return setErrors({
            ...errors,
            form_error: `${emptyInputs.join(", ")} can't be empty`
        })
        if (!uploadError && emptyInputs.length === 0) {
            await post({ variables: { itemInput: transformInputs[section](inputs), files } });
            addItemCache({ ...inputs, coverImage: URL.createObjectURL(files[0]) });
        }
    }

    function clearForm() {
        clearUpload();
        setInputs({});
        setErrors({});
        toggleEditMode();
        // addItemCache here instead
    }

    if (!editMode) return <CustomButton btn_class="btn-icon-text btn-icon float-right" icon="fa fa-plus" onClick={() => toggleEditMode(true)}>new</CustomButton>

    return <ItemForm
        form_title="Create"
        inputs={inputs}
        errors={errors}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onClose={() => clearForm()}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{ files, uploadError, clearUpload, getInputProps, getRootProps }}
    >
    </ItemForm>
}

export default ItemCreate