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

    const handleNewFabric = newFabric => {
        console.log(newFabric)
        setInputs({
            ...inputs,
            fabrics: [...inputs.fabrics, newFabric],
        })
    }

    const handleDeleteFabric = id => {
        setInputs({
            ...inputs,
            fabrics: inputs.fabrics.filter(fabric => fabric._id !== id)
        })
    }

    async function onSubmit() {
        const { price, delivery, description, fabrics } = inputs;
        if (!price || price === 0 || !delivery || delivery === 0 || description === "" || fabrics.length === 0) {
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
                        fabrics: inputs.fabrics.map(fab => fab._id),
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
        addFabric={handleNewFabric}
        deleteFabric={handleDeleteFabric}
        onSubmit={handleSubmit}
    />
}

export default PackageUpdate
