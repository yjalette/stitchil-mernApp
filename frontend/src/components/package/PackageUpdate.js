import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { PACKAGE_UPDATE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import PackageForm from './PackageForm'
import { initState_package } from '../../constants/initStates'
import { useToggle } from '../../custom_hooks/useToggle'

const PackageUpdate = ({ item, updateQuery }) => {
    const { itemId } = useParams()
    const { inputs,
        setInputs,
        handleChange,
        handleSubmit,
        errors,
        setErrors } = useForm(initState_package, onSubmit);
    const [saved, toggle] = useToggle(false)
    const [post] = useMutation(PACKAGE_UPDATE_MUTATION, {
        onCompleted: data => {
            if (data) {
                console.log(data)
                updateQuery(prev => {
                    const updated_package = data.update_package
                    console.log(prev)
                    const newState = [...prev.gig.packages]
                    const index = newState.findIndex(val => val.type === updated_package.type);
                    newState.splice(index, 1, updated_package)
                    return {
                        gig: {
                            ...prev.gig,
                            packages: newState
                        }
                    }
                })
                // updateCache(inputs)
                toggle(true)
            }
        }
    });
    useEffect(() => {
        if (item) setInputs(item)
    }, [item])

    const handleNewSwatch = newSwatch => {
        console.log(newSwatch)
        setInputs({
            ...inputs,
            swatches: [...inputs.swatches, newSwatch._id],
        })
    }

    const handleDeleteSwatch = id => {
        setInputs({
            ...inputs,
            swatches: inputs.swatches.filter(swatchId => swatchId !== id)
        })
    }

    async function onSubmit() {
        const { price, delivery, description, swatches } = inputs;
        if (!price || price === 0 || !delivery || delivery === 0 || description === "" || swatches.length === 0) {
            return setErrors({
                form_error: "all fields must be filled"
            })
        }
        else {
            if (inputs.price) inputs.price = parseInt(inputs.price)
            if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
            post({
                variables: {
                    packageInput: {
                        ...inputs,
                        __typename: undefined
                    },
                    itemId
                }
            })
        }

    }

    return <PackageForm
        inputs={inputs}
        errors={errors}
        saved={saved}
        onChange={handleChange}
        addSwatch={handleNewSwatch}
        deleteSwatch={handleDeleteSwatch}
        onSubmit={handleSubmit}
    />
}

export default PackageUpdate
