import React, { useState } from 'react'

const useForm = (initState, submit) => {
    const [inputs, setInputs] = useState(initState);
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState("");
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => setEditMode(editMode ? false : true);

    const handleChange = ({ target }) => {
        setInputs({
            ...inputs,
            [target.name]: target.value
        });
    }

    const handleBooleanChange = ({ target, currentTarget }) => {
        console.log(target.checked, target.value)
        setInputs({
            ...inputs,
            [target.name]: target.checked
        })
    }

    const handleMultiChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        submit();
    }

    const handleCancel = () => {
        setInputs((prevState) => {
            return {
                ...prevState
            }
        })
        setEditMode(false);
    }

    const handleClear = () => {
        setInputs(() => initState)
    }

    return {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleBooleanChange,
        handleSubmit,
        handleCancel,
        handleClear,
        toggleEditMode,
        editMode,
        errors,
        setEditMode,
        setErrors,
        setMsg,
        msg
    }
}

export default useForm
