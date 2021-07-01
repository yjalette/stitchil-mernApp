import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { initState_overview } from '../../constants/initStates';
import { transformInputs } from './helpers';
import { useToggle } from '../../custom_hooks/useToggle';
import { isNotEmpty } from '../../validation/is_obj_empty';
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import ItemOverviewForm from './ItemOverviewForm';
import ActionStatus from '../notification/ActionStatus';

const ItemOverviewUpdate = ({ item, updateQuery }) => {
    const [saved, setSaved] = useToggle(false);
    const init = item ? initState_overview[item.group] : {};
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors } = useForm({}, onSubmit);

    const [post, { error }] = useMutation(mutations["UPDATE"], {
        onCompleted: async data => {
            if (!error) {
                await updateQuery((prev, res) => {
                    return {
                        ...prev,
                        [inputs.group]: {
                            ...prev[inputs.group],
                            item: inputs
                        }
                    }
                })
                return setSaved(true)
            }
        }
    });

    useEffect(() => {
        if (item) setInputs(item)
    }, [item])

    console.log(inputs)

    function onSubmit() {
        const notValid = Object.keys(init).find(k => !isNotEmpty(inputs[k]))
        if (notValid) return setErrors({
            ...errors,
            form_error: `All fields must be filled`
        })
        else post({
            variables: {
                itemInput: transformInputs(inputs), itemId: item._id
            }
        });
    }
    console.log(saved)
    return (
        <>
            {saved && <ActionStatus status="success" />}
            {error && <ActionStatus status="error" />}
            <ItemOverviewForm
                init={init}
                inputs={inputs}
                onChange={handleChange}
                onMultiChange={handleMultiChange}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default ItemOverviewUpdate
