import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { initState_product } from '../../constants/initStates';
import { isNotEmpty } from '../../validation/is_obj_empty';
import { transformInputs } from './helpers'
import { CREATE_PRODUCT_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';
import ProductForm from './ProductForm';

const ProductCreate = ({ onCompleted }) => {
    const {
        inputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors,
    } = useForm(initState_product, onSubmit);

    const [post] = useMutation(CREATE_PRODUCT_MUTATION, {
        onCompleted: data => {
            if (data.createProduct) {
                const productId = data.createProduct;
                onCompleted(productId, inputs.productType)
            }
        }
    });

    function onSubmit() {
        const notValid = Object.keys(inputs)
            .find(k => !isNotEmpty(inputs[k]))
        if (notValid) return setErrors({
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

export default ProductCreate
