import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import useForm from '../../custom_hooks/useForm'
import useUpload from '../../custom_hooks/useUpload'
import usePostData from '../../custom_hooks/usePostData';
import ItemForm from './ItemForm';
import ProfileItemContext from '../../context/ProfileItem-context';
import IconButton from '../../layout/buttons/IconButton';

import { transformInputs, initState } from "./util"
import ItemUpload from './ItemUpload';

const ItemUpdate = ({ item, index }) => {
    const { section } = useParams();
    const { post } = usePostData(`update${section}`);
    const { file, clearUpload, getRootProps, getInputProps } = useUpload();
    const { updateItemCache } = useContext(ProfileItemContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel, editMode, setEditMode } = useForm(initState[section], onSubmit);

    useEffect(() => {
        if (item) setInputs(item);
    }, [item])


    function onSubmit() {
        post({
            variables: {
                itemInput: transformInputs(inputs),
                file,
                itemId: item._id
            }
        });
        updateItemCache({ ...inputs, imageUrl: file ? URL.createObjectURL(file) : inputs.imageUrl }, index);
        setEditMode(false);
    }


    if (!editMode) return <IconButton icon_class="fa fa-edit" onClick={() => setEditMode(true)} />

    return <ItemForm
        form_title="Update Item"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        form_props={{
            inputs,
            onChange: handleChange,
            onMultiChange: handleMultiChange,
            media: <ItemUpload file={file} prevFile={item.imageUrl} clearUpload={clearUpload} getInputProps={getInputProps} getRootProps={getRootProps} />
        }} />
}

export default ItemUpdate
