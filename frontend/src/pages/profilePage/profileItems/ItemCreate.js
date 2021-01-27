import React from 'react'
import { useParams } from 'react-router-dom'

import useUpload from '../../../custom_hooks/useUpload';
import ItemForm from './ItemForm';
import { initState, transformInputs } from "./util"
import ItemUpload from './ItemUpload';
import useForm from '../../../custom_hooks/useForm';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { mutation_create } from './api';

const ItemCreate = ({ overLimit, addItemCache }) => {
    const { section } = useParams();
    const { post } = useMutationHook(mutation_create[section]);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel } = useForm(initState[section], onSubmit);
    const { file, clearUpload, getRootProps, getInputProps } = useUpload();

    function onSubmit() {
        post({
            variables: {
                itemInput: transformInputs(inputs),
                file
            }
        });
        setInputs({});
        clearUpload();
        addItemCache({ ...inputs, imageUrl: URL.createObjectURL(file), createdAt: "just now", __typename: "", _id: 0, likes: [] })
    }

    return <ItemForm
        form_title="Create"
        inputs={inputs}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media={<ItemUpload file={file} clearUpload={clearUpload} getInputProps={getInputProps} getRootProps={getRootProps} />}
    />
}

export default ItemCreate
