import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { initState_overview } from '../../constants/initStates';
import { transformInputs } from './helpers';
import { useToggle } from '../../custom_hooks/useToggle';
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import ItemOverviewForm from './ItemOverviewForm';
import ActionStatus from '../notification/ActionStatus';

const ItemOverviewUpdate = ({ item, updateQuery }) => {
    const init = item && item.group ? initState_overview[item.group] : {};
    const [saved, setSaved] = useToggle(false);
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors } = useForm(init, onSubmit);

    const [post, { error }] = useMutation(mutations["UPDATE"], {
        onCompleted: async data => {
            if (!error) {
                await updateQuery((prev, res) => {
                    return {
                        ...prev,
                        gig: {
                            ...prev.gig,
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

    function onSubmit() {
        // const emptyInputs = validate(inputs);
        // if (emptyInputs.length > 0) return setErrors({
        //     ...errors,
        //     form_error: `${emptyInputs.join(", ")} can't be empty`
        // })
        post({
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
