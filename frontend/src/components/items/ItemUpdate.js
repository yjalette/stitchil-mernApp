import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../custom_hooks/useForm'
import useUpload from '../../custom_hooks/useUpload'
import ItemForm from './ItemForm';
import CustomButton from '../../layout/button/CustomButton';
import { initState, transformInputs, validate } from "./helpers"

const ItemUpdate = ({ item, updateItemCache, index, mutation }) => {
    const { section } = useParams();
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, editMode, toggleEditMode, errors, setErrors } = useForm(initState[section], onSubmit);
    const { files, clearUpload, getRootProps, getInputProps } = useUpload(null, inputs.gallery ? 5 - inputs.gallery.length : 5);
    const [post] = useMutation(mutation, {
        onCompleted: async data => {
            await updateItemCache(inputs, index);
            clearUpload();
            setErrors({});
            toggleEditMode();
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
                itemInput: transformInputs[section](inputs),
                files
            }
        });
    }

    if (!editMode) return <CustomButton btn_title="edit item" btn_class="btn-icon" icon="fa fa-edit" onClick={toggleEditMode}></CustomButton>

    const prevFiles = inputs.gallery.map((item, index) => <div key={index} className="item-upload-wrapper">
        <Image className="itemUpload__img itemUpdate-prevImg" src={item} alt="file" />
        {item === inputs.coverImage ? <i className="itemUpdate-cover__footer itemUpload-footer fa fa-shield">cover</i>
            : <> <CustomButton
                btn_class="btn-click itemUpdate__overlay-btn"
                btn_otherProps={{
                    title: "set as a cover",
                    name: "coverImage",
                    value: item
                }}
                onClick={handleChange}>cover</CustomButton>
                <i title="delete image" className="fa fa-close itemUpload-footer" onClick={() => setInputs({
                    ...inputs,
                    gallery: inputs.gallery.filter((item, i) => i !== index)
                })} />
            </>}
    </div>)

    console.log(errors)

    return <ItemForm
        form_title="Update"
        errors={errors}
        inputs={inputs}
        initState={initState[section]}
        onSubmit={handleSubmit}
        onClose={() => clearUpload()}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{ files, prevFiles, clearUpload, getInputProps, getRootProps }}
    />
}


export default ItemUpdate
