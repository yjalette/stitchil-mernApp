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

    const handleMultiChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e, "use form")
        submit();
        setEditMode(false);
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
        console.log("meows", initState)
        setInputs(() => initState)
    }

    return {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
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
