import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FABRIC_UPDATE_MUTATION, FABRIC_DELETE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import FabricForm from './FabricForm'
import { initState_fabric } from '../../constants/initStates'

const FabricUpdate = ({ fabric, updateCache }) => {
    const { inputs,
        setInputs,
        errors,
        setErrors,
        handleChange,
        handleMultiChange,
        handleSubmit } = useForm(initState_fabric, onSubmit);
    const [file, setFile] = useState();
    const [post] = useMutation(FABRIC_UPDATE_MUTATION, {
        onCompleted: async data => {
            console.log(data)
            if (data) {
                await updateCache(data.update_fabric);
            }
        }
    });

    useEffect(() => {
        if (fabric) setInputs(fabric)
    }, [fabric])

    const handleDeleteImg = () => {
        setInputs({
            ...inputs,
            image: ""
        })
    }

    const handleUpload = upload => setFile(upload);


    async function onSubmit() {
        post({
            variables: {
                fabricInput: {
                    ...inputs,
                    "__typename": undefined
                },
                file
            }
        })
    }

    return <FabricForm
        inputs={inputs}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        handleUpload={handleUpload}
        handleDeleteImg={handleDeleteImg}
        file={file}
        onSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
    />
}

export default FabricUpdate
