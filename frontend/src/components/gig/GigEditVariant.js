import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import useForm from '../../custom_hooks/useForm'
import { GIG_UPDATE_VARIANT_MUTATION } from './graphql/mutations'
import GigFormVariant from './GigFormVariant'
import CustomButton from '../../layout/button/CustomButton'
import { useParams } from 'react-router'

const initState = { fabric: [], color: [], price: 0, delivery: 0 }

const GigEditVariant = ({ variant }) => {
    const { itemId } = useParams()
    const [post] = useMutation(GIG_UPDATE_VARIANT_MUTATION);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, editMode, setEditMode } = useForm(initState, onSubmit);

    useEffect(() => {
        if (variant) setInputs(variant)
    }, [variant])

    function onSubmit() {
        if (inputs.price) inputs.price = parseInt(inputs.price)
        if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
        post({
            variables: {
                variantInput: { ...inputs, __typename: undefined },
                itemId
            }
        })
    }
    if (!editMode) return <CustomButton
        onClick={() => setEditMode(true)}
        btn_class="btn-icon"
        icon="fas fa-edit float-right" />

    return <GigFormVariant
        inputs={inputs}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        onSubmit={handleSubmit}
    />
}

export default GigEditVariant
