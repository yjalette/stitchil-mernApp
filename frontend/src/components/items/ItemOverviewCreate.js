import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router';
import { initState_overview } from '../../constants/initStates';
import { newItem } from './constants'
import { isNotEmpty } from '../../validation/is_obj_empty';
import { transformInputs } from './helpers'
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import ItemOverviewForm from './ItemOverviewForm';
import CustomModal from '../../layout/CustomModal';
import ActionStatus from '../notification/ActionStatus';

const ItemOverviewCreate = () => {
    const { section } = useParams()
    const group = newItem[section].group;
    const [saved, setSaved] = useState(false)
    const { push } = useHistory()
    const {
        inputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors,
    } = useForm(initState_overview[group], onSubmit);

    const [post] = useMutation(mutations["CREATE"], {
        onCompleted: data => {
            if (data.create_item_overview) {
                const itemId = data.create_item_overview
                setSaved(true)
                setTimeout(() => {
                    push(`/profile-item/${group}/draft/${itemId}/images/`)
                }, 3000)
            }
        }
    });

    function onSubmit() {
        const notValid = Object.keys(inputs).find(k => !isNotEmpty(inputs[k]))
        if (notValid) return setErrors({
            ...errors,
            form_error: `all fields must be filled`
        })

        else {
            post({
                variables: {
                    itemInput: transformInputs(inputs),
                    group
                }
            });
            return setErrors({})
        }
    }

    return (
        <CustomModal
            modal_title={`${section} - new item`}
            modal_size={newItem[section].modal_size}
            btn_class="btn-icon-text fas fa-plus profileCreate-btn"
            btn_otherProps={{
                title: "create"
            }}
        >
            {saved && <ActionStatus status="success" />}
            <ItemOverviewForm
                init={initState_overview[group]}
                inputs={inputs}
                errors={errors}
                onChange={handleChange}
                onMultiChange={handleMultiChange}
                onSubmit={handleSubmit}
            />
        </CustomModal>
    )
}

export default ItemOverviewCreate
