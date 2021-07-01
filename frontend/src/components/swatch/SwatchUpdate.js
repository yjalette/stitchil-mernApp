import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SWATCH_UPDATE_MUTATION, SWATCH_DELETE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import SwatchForm from './SwatchForm'
import { initState_swatch } from '../../constants/initStates'
import { useToggle } from '../../custom_hooks/useToggle'

const SwatchUpdate = ({ swatch, updateCache }) => {
    const { inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit } = useForm(initState_swatch, onSubmit);
    const [file, setFile] = useState();
    const [open, toggle] = useToggle(true)
    const [post] = useMutation(SWATCH_UPDATE_MUTATION, {
        onCompleted: async data => {
            console.log(data)
            if (data) {
                await updateCache(data.update_swatch);
                toggle()
            }
        }
    });

    useEffect(() => {
        if (swatch) setInputs(swatch)
    }, [swatch])

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
                swatchInput: {
                    ...inputs,
                    "__typename": undefined
                },
                file
            }
        })
    }

    return <SwatchForm
        inputs={inputs}
        closeModal={!open}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        handleUpload={handleUpload}
        handleDeleteImg={handleDeleteImg}
        onSubmit={handleSubmit}
    />
}

export default SwatchUpdate
