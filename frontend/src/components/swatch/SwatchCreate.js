import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SWATCH_CREATE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import SwatchForm from './SwatchForm'
import { initState_swatch } from '../../constants/initStates'
import { useToggle } from '../../custom_hooks/useToggle'

const SwatchCreate = ({ addNewSwatchCache }) => {
    const { inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        setErrors,
        errors
    } = useForm(initState_swatch, onSubmit);
    const [file, setFile] = useState();
    const [open, toggle] = useToggle(true)
    const [post] = useMutation(SWATCH_CREATE_MUTATION, {
        onCompleted: async data => {
            if (data) {
                toggle();
                await addNewSwatchCache(data.create_swatch)
                setInputs(initState_swatch);
                setErrors({})
            }

        }
    });

    const handleUpload = upload => setFile(upload);

    async function onSubmit() {
        const { fabric, color, description } = inputs;
        if (!file || fabric.length === 0 || color.length === 0 || description === "") {
            return setErrors(
                {
                    form_error: "all fields must be filled"
                }
            )
        }
        else return post({
            variables: {
                swatchInput: {
                    ...inputs,
                    image: undefined
                },
                file
            }
        })

    }

    return <SwatchForm
        inputs={inputs}
        errors={errors}
        closeModal={!open}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        handleUpload={handleUpload}
        onSubmit={handleSubmit}
    />
}

export default SwatchCreate
