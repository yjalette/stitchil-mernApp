import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router';
import { initState_overview } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import { transformInputs } from './helpers'
import ItemOverviewForm from './ItemOverviewForm';
import CustomButton from '../../layout/button/CustomButton';
import CustomModal from '../../layout/CustomModal';
import { item_group } from './constants'

const ItemOverviewCreate = () => {
    const { section } = useParams()
    const group = item_group[section];
    const { push } = useHistory()
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors,
        msg,
        setMsg
    } = useForm(initState_overview[group], onSubmit);

    const [post] = useMutation(mutations["CREATE"], {
        onCompleted: data => {
            if (data.create_item_overview) {
                const itemId = data.create_item_overview
                setMsg("Success!");
                setTimeout(() => {
                    push(`/profile-item/${group}/draft/${itemId}/images/`)
                }, 3000)
            }
        }
    });


    function onSubmit() {
        // const emptyInputs = validate(inputs);
        // if (emptyInputs.length > 0) return setErrors({
        //     ...errors,
        //     form_error: `${emptyInputs.join(", ")} can't be empty`
        // })
        post({
            variables: { itemInput: transformInputs(inputs), group }
        });
    }

    return (
        <CustomModal
            modal_title="create a new item"
            modal_size="md"
            btn_class="btn-icon-text fas fa-plus profileCreate-btn"
            btn_otherProps={{
                title: "create"
            }}
        >
            <ItemOverviewForm
                form_msg={msg}
                init={initState_overview[group]}
                inputs={inputs}
                onChange={handleChange}
                onMultiChange={handleMultiChange}
                onSubmit={handleSubmit}
            />
        </CustomModal>
    )
}

export default ItemOverviewCreate
