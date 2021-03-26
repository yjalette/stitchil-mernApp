import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import useForm from '../../custom_hooks/useForm'
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'
import { GIG_CREATE_VARIANT_MUTATION } from './graphql/mutations'
import { useParams } from 'react-router'
import CustomModal from '../../layout/CustomModal'
import GigFormVariant from './GigFormVariant'
import CustomButton from '../../layout/button/CustomButton'

const initState = { fabric: [], color: [], price: 0, delivery: 0 }

const GigAddVariant = ({ itemId }) => {
    const [post] = useMutation(GIG_CREATE_VARIANT_MUTATION);
    const { inputs, handleChange, handleMultiChange, handleSubmit, editMode, setEditMode } = useForm(initState, onSubmit);

    function onSubmit() {
        if (inputs.price) inputs.price = parseInt(inputs.price)
        if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
        post({
            variables: {
                variantInput: inputs,
                itemId
            }
        })
        setEditMode(false)
    }
    if (!editMode) return <CustomButton
        onClick={() => setEditMode(true)}
        btn_class="btn-icon-text float-right"
        icon="fas fa-plus"
    >create a variant</CustomButton>

    return <GigFormVariant
        inputs={inputs}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        onSubmit={handleSubmit}
    />
}

export default GigAddVariant
