import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router';
import { initState_overview } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import { transformInputs } from './helpers'
import ItemOverviewForm from './ItemOverviewForm';

const ItemOverviewCreate = () => {
    const { group } = useParams()
    const { push } = useHistory()
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors } = useForm(initState_overview[group], onSubmit);

    const [post] = useMutation(mutations["CREATE"], {
        onCompleted: async data => {
            push(`/${group}/draft/${data.create_item_overview}/`)
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
    console.log(inputs)
    return (
        <>
            <ItemOverviewForm
                init={initState_overview[group]}
                inputs={inputs}
                onChange={handleChange}
                onMultiChange={handleMultiChange}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default ItemOverviewCreate
