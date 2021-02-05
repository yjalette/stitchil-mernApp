import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap';

import useForm from '../../../custom_hooks/useForm'
import useUpload from '../../../custom_hooks/useUpload'
import ItemForm from './ItemForm';
import { transformInputs, initState } from "./helpers"
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
                itemInput: transformInputs[section](inputs),
                files
            }
        });
        updateItemCache(inputs, index);
        clearUpload();
        toggleEditMode();
    }


    if (!editMode) return <CustomButton btn_title="edit item" btn_class="btn-icon" icon="fa fa-edit" onClick={toggleEditMode}></CustomButton>

    const prevFiles = inputs.gallery.map((item, index) => <div key={index} className="item-upload-wrapper">
        <Image className="itemUpload__img itemUpdate-prevImg" src={item} alt="file" />
        {item === inputs.coverImage ? <i className="itemUpdate-cover__footer itemUpload-footer fa fa-shield">cover</i>
            : <> <CustomButton
                btn_title="set as a cover"
                btn_class="btn-click itemUpdate__overlay-btn"
                btn_name="coverImage"
                btn_value={item}
                onClick={handleChange}>cover</CustomButton>
                <i title="delete image" className="fa fa-close itemUpload-footer" onClick={() => setInputs({ ...inputs, gallery: inputs.gallery.filter((item, i) => i !== index) })} />
            </>}
    </div>)

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
        media_props={{
            files,
            prevFiles,
            clearUpload, getInputProps, getRootProps
        }}
    />
}

export default ItemUpdate
