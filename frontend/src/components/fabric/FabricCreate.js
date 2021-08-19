import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FABRIC_CREATE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import FabricForm from './FabricForm'
import { initState_fabric } from '../../constants/initStates'

const FabricCreate = ({ addNewFabricCache }) => {
    const { inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        setErrors,
        errors
    } = useForm(initState_fabric, onSubmit);
    const [file, setFile] = useState();
    const [post] = useMutation(FABRIC_CREATE_MUTATION, {
        onCompleted: async data => {
            if (data) {
                await addNewFabricCache(data.create_fabric)
                setInputs(initState_fabric);
                setErrors({})
            }

        }
    });

    const handleUpload = upload => setFile(upload);

    async function onSubmit() {

        return post({
            variables: {
                fabricInput: {
                    ...inputs,
                    image: undefined
                },
                file
            }
        })

    }

    return <FabricForm
        inputs={inputs}
        errors={errors}
        setErrors={setErrors}
        file={file}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        handleUpload={handleUpload}
        onSubmit={handleSubmit}
    />
}

export default FabricCreate
