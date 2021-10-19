import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { initState_product } from '../../constants/initStates';
import { isNotEmpty } from '../../validation/is_obj_empty';
import { transformInputs } from './helpers'
import useForm from '../../custom_hooks/useForm';
import { UPDATE_PRODUCT_MUTATION } from './graphql/mutations';
import ProductForm from './ProductForm';

const ProductUpdate = ({ product, onCompleted }) => {
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors,
    } = useForm(initState_product || {}, onSubmit);

    useEffect(() => {
        if (product) {
            setInputs(product)
        }
    }, [product])

    const [post] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onCompleted: data => {
            if (data.updateProduct) {
                // const productId = data.updateProduct;
                // onCompleted && onCompleted(productId)
                // setSaved(true)
                // setTimeout(() => {
                //     push(`/profile-item/${group}/draft/${itemId}/images/`)
                // }, 3000)
            }
        }
    });

    console.log(inputs)
    function onSubmit() {
        const notValid = Object.keys(inputs).find(k => !isNotEmpty(inputs[k]))
        console.log(notValid, Object.keys(errors))
        if (notValid && notValid !== "occasion") return setErrors({
            ...errors,
            form_error: `All fields must be filled`
        })
        else {
            post({
                variables: {
                    productInput: transformInputs(inputs)
                }
            });
            return setErrors({})
        }
    }

    return (

        <ProductForm
            init={initState_product}
            inputs={inputs}
            errors={errors}
            onChange={handleChange}
            onMultiChange={handleMultiChange}
            onSubmit={handleSubmit}
        />

    )
}

export default ProductUpdate
