
import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'
import { CREATE_ORDER_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import OrderForm from './OrderForm'

const init = {
    fabricId: null,
    packageId: null,
    shippingAddressId: null,
    billingAddressId: null,
    shippingId: null,
}

const OrderCreate = () => {
    const { state } = useLocation()
    const {
        inputs,
        setInputs,
        setErrors,
        errors,
        handleSubmit,
        setMsg,
        msg } = useForm(init, onSubmit)
    const [post] = useMutation(CREATE_ORDER_MUTATION, {
        onCompleted: data => {
            if (data) {
                setErrors({})
                setMsg("order was successfully submitted")
            }
        }
    })

    useEffect(() => {
        if (state) {
            const { orderInput } = state
            setInputs({
                ...inputs,
                ...orderInput
            })
        }
    }, [state])

    const handleChange = (name, id) => {
        console.log(name, id)
        setInputs({
            ...inputs,
            [name]: id
        })
    }

    function onSubmit() {
        if (!inputs.shippingAddressId) {
            setErrors({
                form_error: "please check your shipping address"
            })
        }

        else {
            return post({
                variables: {
                    orderInput: inputs
                }
            })
        }
    }

    console.log(state)

    if (!state) return null

    return <OrderForm
        inputs={inputs}
        errors={errors}
        msg={msg}
        item={state && state.item}
        packages={state && state.orderOptions && state.orderOptions.packages}
        shipping_options={state && state.orderOptions && state.orderOptions.shipping_options}
        handleChange={handleChange}
        onSubmit={handleSubmit}

    />
}

export default OrderCreate