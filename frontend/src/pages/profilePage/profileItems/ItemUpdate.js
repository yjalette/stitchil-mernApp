import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useForm from '../../../custom_hooks/useForm'
import useUpload from '../../../custom_hooks/useUpload'
import ItemForm from './ItemForm';
import { transformInputs, initState } from "./helpers"
import ItemUpload from './ItemUpload';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { mutation_update } from './api';
import CustomButton from '../../../layout/button/CustomButton';

const ItemUpdate = ({ item, updateItemCache, index }) => {
    const { section } = useParams();
    const { post } = useMutationHook(mutation_update[section])
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel, editMode, toggleEditMode } = useForm(initState[section], onSubmit);
    const { files, clearUpload, getRootProps, getInputProps } = useUpload(null, inputs.gallery ? 5 - inputs.gallery : 5);

    useEffect(() => {
        if (item) setInputs(item);
    }, [item])

    function onSubmit() {
        post({
            variables: {
                itemInput: transformInputs(inputs),
                files,
            }
        });
        updateItemCache({ ...inputs, coverImage: files ? URL.createObjectURL(files[0]) : inputs.coverImage }, index);
        clearUpload();
        toggleEditMode();
    }

    if (!editMode) return <CustomButton btn_class="btn-icon" icon="fa fa-edit" onClick={toggleEditMode}></CustomButton>

    return <ItemForm
        form_title="update"
        inputs={inputs}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onClose={() => {
            handleCancel();
            clearUpload();
        }}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{ files, prevFiles: inputs.gallery, clearUpload, getInputProps, getRootProps }}
    />
}

export default ItemUpdate
