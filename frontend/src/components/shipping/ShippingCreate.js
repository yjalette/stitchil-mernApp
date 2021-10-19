import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { SHIPPING_CREATE_MUTATION } from './graphql/mutations'
import { initState_shipping } from '../../constants/initStates'
import useForm from '../../custom_hooks/useForm'
import ShippingForm from './ShippingForm'

const ShippingCreate = ({ updateQuery }) => {
    const { listingId } = useParams();
    const [post] = useMutation(SHIPPING_CREATE_MUTATION, {
        onCompleted: data => {
            if (data) {
                const newShipping = data.createShipping;
                updateQuery(prev => {
                    return {
                        listing: {
                            ...prev.listing,
                            shipping_options: [
                                ...prev.listing.shipping_options,
                                newShipping]
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



    function onSubmit() {
        post({
            variables: {
                shippingInput: inputs,
                listingId
            }
        })

    }
    return <ShippingForm
        inputs={inputs}
        errors={errors}
        setErrors={setErrors}
        setInputs={setInputs}
        onChange={handleChange}
        onSubmit={handleSubmit}
    />
}

export default ShippingCreate
