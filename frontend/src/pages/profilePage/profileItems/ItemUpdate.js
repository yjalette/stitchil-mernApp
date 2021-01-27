import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useForm from '../../../custom_hooks/useForm'
import useUpload from '../../../custom_hooks/useUpload'
import ItemForm from './ItemForm';
import { transformInputs, initState } from "./helpers"
import ItemUpload from './ItemUpload';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { mutation_update } from './api';

const ItemUpdate = ({ item, updateItemCache, index }) => {
    const { section } = useParams();
    const { post } = useMutationHook(mutation_update[section])
    const { file, clearUpload, getRootProps, getInputProps } = useUpload();
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel } = useForm(initState[section], onSubmit);

    useEffect(() => {
        if (item) setInputs(item);
    }, [item])

    function onSubmit() {
        post({
            variables: {
                itemInput: transformInputs({ ...inputs, likes: undefined }),
                file,
                itemId: item._id
            }
        });
        updateItemCache({ ...inputs, imageUrl: file ? URL.createObjectURL(file) : inputs.imageUrl }, index);
    }


    return <ItemForm
        form_title="update"
        inputs={inputs}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media={<ItemUpload file={file} prevFile={item.imageUrl} clearUpload={clearUpload} getInputProps={getInputProps} getRootProps={getRootProps} />}
    />
}

export default ItemUpdate
