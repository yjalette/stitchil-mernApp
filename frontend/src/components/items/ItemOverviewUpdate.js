import { useMutation } from '@apollo/react-hooks';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { initState_overview } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import mutations from './graphql/mutations';
import { transformInputs } from './helpers'
import ItemOverviewForm from './ItemOverviewForm';

const ItemOverviewUpdate = ({ item, updateQuery }) => {
    const init = item && item.group ? initState_overview[item.group] : {}
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors } = useForm(init, onSubmit);

    const [post] = useMutation(mutations["UPDATE"], {
        onCompleted: async data => {
            // console.log(client)
            updateQuery((prev, res) => {
                return {
                    ...prev,
                    gig: {
                        ...prev.gig,
                        item: inputs
                    }
                }
            })
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
            variables: { itemInput: transformInputs(inputs), itemId: item._id }
        });
    }

    return (
        <>
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
