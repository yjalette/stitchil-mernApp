import React from 'react'
import { useParams } from 'react-router-dom'

import useUpload from '../../../custom_hooks/useUpload';
import ItemForm from './ItemForm';
import { initState, transformInputs } from "./helpers"
import useForm from '../../../custom_hooks/useForm';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { mutation_create } from './api';
import CustomButton from '../../../layout/button/CustomButton';

const ItemCreate = ({ overLimit, addItemCache }) => {
    const { section } = useParams();
    const { post } = useMutationHook(mutation_create[section]);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel, editMode, toggleEditMode } = useForm(initState[section], onSubmit);
    const { files, clearUpload, getRootProps, getInputProps } = useUpload(null, 5);

    function onSubmit() {
        post({
            variables: {
                itemInput: transformInputs(inputs),
                files
            }
        });
        setInputs({});
        addItemCache({
            ...inputs,
            coverImage: files ? URL.createObjectURL(files[0]) : "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg",
            gallery: [],
            createdAt: "just now",
            __typename: "", _id: 0, likes: []
        });
        clearUpload();
        toggleEditMode();
    }

    if (!editMode) return <CustomButton btn_class="btn-icon float-right" icon="fa fa-plus" onClick={toggleEditMode} />

    return <ItemForm
        form_title="Create"
        inputs={inputs}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onClose={() => {
            handleCancel();
            clearUpload();
        }}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{ files, clearUpload, getInputProps, getRootProps }}
    />
}

export default ItemCreate
