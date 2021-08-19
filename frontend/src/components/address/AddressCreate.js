import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import { CREATE_ADDRESS_MUTATION } from './graphql/mutations';
import { initState_address } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import AddressForm from './AddressForm';
import CustomButton from '../../layout/button/CustomButton';

const AddressCreate = ({ updateCache }) => {
    const { inputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        editMode,
        toggleEditMode
    } = useForm(initState_address, onSubmit);

    const [post] = useMutation(CREATE_ADDRESS_MUTATION, {
        onCompleted: async (data) => {
            if (data) {
                await updateCache(data.createAddress)
                toggleEditMode()
            }
        }
    })

    function onSubmit() {
        post({
            variables: {
                addressInput: {
                    ...inputs,
                    state: inputs.state[0],
                    zip: Number(inputs.zip)
                }
            }
        })
    }

    if (!editMode) return <CustomButton btn_class="btn-icon-text fas fa-plus" onClick={toggleEditMode}>new address</CustomButton>

    return <AddressForm inputs={inputs} onChange={handleChange} onMultiChange={handleMultiChange} onSubmit={handleSubmit} />
}

export default AddressCreate
