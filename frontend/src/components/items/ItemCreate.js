import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';

import ItemForm from './ItemForm';
import { transformInputs, validate } from "./helpers"
import useForm from '../../custom_hooks/useForm';
import useUpload from '../../custom_hooks/useUpload';
import { initState_item } from '../../constants/initStates';
import { CREATE } from './graphql/mutations';

const ItemCreate = () => {
    const { section } = useParams();
    const { push, goBack } = useHistory();
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, setEditMode, errors, setErrors } = useForm(initState_item, onSubmit);
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);
    const [post, { error }] = useMutation(CREATE, {
        onCompleted: async data => {
            // await addItemCache(data.create_item);
            // why async to clear
            push(`/item/gigs/${data.create_item._id}`)
            handleClose()
        }
    });

    async function handleClose() {
        clearUpload();
        setInputs({});
        setErrors({});
        setEditMode(false);
    }

    async function onSubmit() {
        const emptyInputs = validate({ ...inputs, files });
        if (emptyInputs.length > 0) return setErrors({
            ...errors,
            form_error: `${emptyInputs.join(", ")} can't be empty`
        })
        if (!uploadError && emptyInputs.length === 0) {
            return await post({ variables: { itemInput: transformInputs(inputs), files, group: section } });
        }
    }


    return <ItemForm
        form_title="Create"
        inputs={inputs}
        errors={errors}
        onSubmit={handleSubmit}
        onClose={() => goBack()}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        media_props={{ files, uploadError, clearUpload, getInputProps, getRootProps }}
    >
    </ItemForm>
}

export default ItemCreate
