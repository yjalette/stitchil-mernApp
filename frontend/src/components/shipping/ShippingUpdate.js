import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { SHIPPING_UPDATE_MUTATION } from './graphql/mutations'
import { initState_shipping } from '../../constants/initStates'
import useForm from '../../custom_hooks/useForm'
import ShippingForm from './ShippingForm'

const ShippingUpdate = ({ updateQuery, shipping }) => {
    const { itemId } = useParams()
    const [post] = useMutation(SHIPPING_UPDATE_MUTATION, {
        onCompleted: data => {
            if (data) {
                updateQuery(prev => {
                    const updated_shipping = data.updateShipping
                    const newState = [...prev.gig.shipping_options]
                    const index = newState.findIndex(val => val._id === updated_shipping._id);
                    newState.splice(index, 1, updated_shipping)
                    return {
                        gig: {
                            ...prev.gig,
                            shipping_options: newState
                        }
                    }
                })
            }
        }
    });
    const { inputs,
        setInputs,
        handleChange,
        handleSubmit,
        setErrors,
        errors
    } = useForm(initState_shipping, onSubmit);

    useEffect(() => {
        if (shipping) setInputs({
            ...shipping,
            itemId,
            __typename: undefined
        })
    }, [shipping])

    function onSubmit() {
        post({
            variables: {
                shippingInput: inputs
            }
        })

    }
    return <ShippingForm
        inputs={inputs}
        errors={errors}
        setErrors={setErrors}
        onChange={handleChange}
        onSubmit={handleSubmit}
    />
}

export default ShippingUpdate
