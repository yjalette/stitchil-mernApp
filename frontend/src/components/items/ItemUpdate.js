import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../custom_hooks/useForm'
import useUpload from '../../custom_hooks/useUpload'
import CustomButton from '../../layout/button/CustomButton';
import { transformInputs, validate } from "./helpers"
import ItemPrevFiles from './ItemPrevFiles';
import ItemForm from './ItemForm';
import { initState_item } from '../../constants/initStates';
import { UPDATE } from './graphql/mutations';

const ItemUpdate = ({ item, updateItemCache }) => {
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, editMode, setEditMode, errors, setErrors } = useForm(initState_item, onSubmit);
    const { files, clearUpload, getRootProps, getInputProps } = useUpload(null, inputs.gallery ? 5 - inputs.gallery.length : 5);
    const [post] = useMutation(UPDATE, {
        onCompleted: async data => {
            await updateItemCache(inputs);
            handleClose();
        }
    });

    useEffect(() => {
        if (item) setInputs(item);
    }, [item])

    function onSubmit() {
        const emptyInputs = validate(inputs);
        if (emptyInputs.length > 0) return setErrors({
            ...errors,
            form_error: `${emptyInputs.join(", ")} can't be empty`
        })
        post({
            variables: {
                itemInput: transformInputs(inputs),
                files
            }
        });
    }

    function handleClose() {
        clearUpload()
        setEditMode(false)
        setErrors({})
    }

    if (!editMode) return <CustomButton
        btn_class="btn-icon float-right"
        icon="fas fa-pencil-alt"
        btn_otherProps={{
            title: "edit"
        }}
        onClick={() => setEditMode(true)} />

    return <ItemForm
        form_title="Update"
        errors={errors}
        inputs={inputs}
        // initState={initState[section]}
        onSubmit={handleSubmit}
        onClose={handleClose}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{
            files,
            prevFiles: <ItemPrevFiles inputs={inputs} onCoverChange={handleChange} onGalleryChange={(index) => setInputs({
                ...inputs,
                gallery: inputs.gallery.filter((item, i) => i !== index)
            })} />,
            clearUpload,
            getInputProps,
            getRootProps
        }}
    />
}


export default ItemUpdate

