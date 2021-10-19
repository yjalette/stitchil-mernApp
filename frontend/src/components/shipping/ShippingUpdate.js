import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SHIPPING_UPDATE_MUTATION } from './graphql/mutations'
import { initState_shipping } from '../../constants/initStates'
import useForm from '../../custom_hooks/useForm'
import ShippingForm from './ShippingForm'
import GroupButton from '../../layout/button/GroupButton'
import ShippingDelete from './ShippingDelete'

const ShippingUpdate = ({ updateQuery, shipping }) => {
    const { inputs,
        setInputs,
        handleChange,
        handleSubmit,
        setErrors,
        errors
    } = useForm(initState_shipping, onSubmit);
    const [post] = useMutation(SHIPPING_UPDATE_MUTATION, {
        onCompleted: data => {
            if (data) {
                updateQuery(prev => {
                    const updated_shipping = data.updateShipping
                    const newState = [...prev.listing.shipping_options]
                    const index = newState.findIndex(val => val._id === updated_shipping._id);
                    newState.splice(index, 1, updated_shipping)
                    return {
                        listing: {
                            ...prev.listing,
                            shipping_options: newState
                        }
                    }
                })
            }
        }
    });


    useEffect(() => {
        if (shipping) setInputs({
            ...shipping,
            __typename: undefined
        })
    }, [shipping])

    function onSubmit() {
        post({
            variables: {
                shippingInput: inputs,
                shippingId: shipping._id
            }
        })

    }
    return (
        <>
            <span className="text-light font-weight-bold">
                {inputs.shippingCarrier}
            </span>
            <span className="text-light ml-1">
                {inputs.mailClass} ${inputs.shippingPrice}
            </span>
            <GroupButton>
                <ShippingForm
                    inputs={inputs}
                    errors={errors}
                    setErrors={setErrors}
                    onChange={handleChange}
                    setInputs={setInputs}
                    onSubmit={handleSubmit}
                />
                <ShippingDelete
                    shippingId={inputs._id}
                    updateQuery={updateQuery} />
            </GroupButton>
        </>

    )
}

export default ShippingUpdate
