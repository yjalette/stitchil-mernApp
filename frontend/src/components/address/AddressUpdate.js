import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import { UPDATE_ADDRESS_MUTATION } from './graphql/mutations';
import { initState_address } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import AddressForm from './AddressForm';

const AddressUpdate = () => {
    const { inputs,
        handleChange,
        handleSubmit } = useForm(initState_address, onSubmit);

    const [post] = useMutation(UPDATE_ADDRESS_MUTATION)

    function onSubmit() {
        post({
            variables: {
                ...inputs,
                state: inputs.state[0],
                zip: Number(inputs.zip)
            }
        })
    }
    return <AddressForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} />
}

export default AddressUpdate
