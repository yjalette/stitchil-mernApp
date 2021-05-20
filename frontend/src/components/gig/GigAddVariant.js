import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { GIG_CREATE_VARIANT_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import GigFormVariant from './GigFormVariant'
import CustomButton from '../../layout/button/CustomButton'

const initState = { fabric: [], color: [], price: 0, delivery: 0 }

const GigAddVariant = ({ addNewVariant }) => {
    const { itemId } = useParams()
    const [post] = useMutation(GIG_CREATE_VARIANT_MUTATION);
    const { inputs, handleChange, handleMultiChange, handleSubmit, editMode, setEditMode } = useForm(initState, onSubmit);

    async function onSubmit() {
        if (inputs.price) inputs.price = parseInt(inputs.price)
        if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
        post({
            variables: {
                variantInput: inputs,
                itemId
            }
        })
        await addNewVariant({
            ...inputs,
            _id: Math.random(32 * 10),
            __typename: undefined
        })
        setEditMode(false)
    }
    if (!editMode) return <CustomButton
        onClick={() => setEditMode(true)}
        btn_class="btn-icon-text newVar-btn"
        icon="fas fa-plus"
    >new variant</CustomButton>

    return <GigFormVariant
        inputs={inputs}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        onSubmit={handleSubmit}
    />
}

export default GigAddVariant
