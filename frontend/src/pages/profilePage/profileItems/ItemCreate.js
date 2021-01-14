import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'


import useUpload from '../../../custom_hooks/useUpload';
import usePostData from '../../../custom_hooks/usePostData';
import IconButton from '../../../layout/buttons/IconButton'
import ItemForm from './ItemForm';
import { initState, transformInputs } from "./util"
import ItemUpload from './ItemUpload';
import InlineAlert from '../../../layout/alerts/InlineAlert';
import ProfileItemContext from '../../../context/ProfileItem-context';
import useForm from '../../../custom_hooks/useForm';

const ItemCreate = ({ overLimit }) => {
    const { section } = useParams();
    const { post } = usePostData(`create${section}`);
    const { addItemCache } = useContext(ProfileItemContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, handleCancel, editMode, setEditMode } = useForm(initState[section], onSubmit);
    const { file, clearUpload, getRootProps, getInputProps } = useUpload();
    const [open, setOpen] = useState(false);

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
        setEditMode(false);
    }


    const handleEditMode = () => {
        if (overLimit) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
        else setEditMode(true)
    }


    if (!editMode) return (
        <>
            <IconButton icon_class="fa fa-plus" onClick={handleEditMode} />
            {open && <InlineAlert variant="danger" content="max 6 items in demo version" alert_class="text-left w-auto" />}
        </>
    )


    return <ItemForm
        form_title="Create Item"
        onSubmit={handleSubmit}
        onCancel={() => {
            handleCancel();
            setEditMode(false)
        }}
        form_props={{
            inputs,
            onChange: handleChange,
            onMultiChange: handleMultiChange,
            media: <ItemUpload file={file} prevFile={null} clearUpload={clearUpload} getInputProps={getInputProps} getRootProps={getRootProps} />
        }} />

    // return <ItemForm media={{ prevFile: null, upload_class: "slides__img upload__new", file, getInputProps, getRootProps }} onSubmit={handleSubmit} onCancel={handleCancel} form_props={{ inputs, onChange: handleChange, onMultiChange: handleMultiChange }} />
}

export default ItemCreate
