import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { PACKAGE_CREATE_MUTATION } from './graphql/mutations'
import { initState_package } from '../../constants/initStates'
import useForm from '../../custom_hooks/useForm'
import PackageForm from './PackageForm'

const PackageCreate = ({ type, addNewPackageCache }) => {
    const { itemId } = useParams()
    const [post] = useMutation(PACKAGE_CREATE_MUTATION, {
        onCompleted: data => {
            if (data) addNewPackageCache(data.create_package)
        }
    });
    const { inputs,
        setInputs,
        handleChange,
        handleSubmit,
        setErrors,
        errors
    } = useForm(initState_package, onSubmit);

    const handleSwatch = newSwatch => {
        setInputs({
            ...inputs,
            swatches: [...inputs.swatches, newSwatch._id]
        })
    }

    async function onSubmit() {
        const { price, delivery, description, swatches } = inputs;
        if (price === 0 || delivery === 0 || description === "" || swatches.length === 0) {
            return setErrors({
                form_error: "all fields must be filled"
            })
        }
        else {
            if (inputs.price) inputs.price = parseInt(inputs.price)
            if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
            post({
                variables: {
                    packageInput: { ...inputs, type },
                    itemId
                }
            })
        }
    }
    return <PackageForm
        inputs={inputs}
        errors={errors}
        onChange={handleChange}
        addSwatch={handleSwatch}
        onSubmit={handleSubmit}
    />
}

export default PackageCreate
