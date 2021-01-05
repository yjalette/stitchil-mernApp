import React, { useEffect, useState, useReducer } from 'react';


import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import { validate } from '../../validation/validate_form'
import { updateLocalStorage } from '../../helpers/localStorageHelper';
import { accountReducer } from './accountReducer';
import FormMultipleInput from '../inputs/FormMultipleInput';
import FormInput from '../inputs/FormInput';

const AccountUpdate = ({ label, value }) => {
    // const [comp, dispatch] = useReducer(accountReducer, label.toUpperCase(), "bau");
    const { post } = usePostData("updateuser", onPostCompleted);
    const { inputs, setInputs, errors, setErrors, handleSubmit } = useForm({}, onSubmit);
    const [msg, setMsg] = useState("");


    // useEffect(() => {
    //    label && dispatch({ type: label.toUpperCase() });
    // }, [label]);

    useEffect(() => {
        if (value) {
            setInputs({ [label]: value });
            setMsg("");
        }
    }, [value])

    const handleChange = ({ target }) => setInputs({ [label]: target.value })

    // const handleMultiChange = ({ value }) => setInputs({ [label]: value })


    function validate_form(obj) {
        const error_input = validate(obj);
        if (error_input) setErrors({ ...errors, ...error_input });
        else if (!error_input) setErrors({});
    }

    function onPostCompleted(response) {
        if (response) {
            if (inputs.username) updateLocalStorage('user', inputs)
            return setMsg(`${label} was successfully updated`);
        }
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) post({ variables: { userInput: inputs } });
    }


    return (
        <CustomForm form_class="account page__box" form_msg={msg} onSubmit={handleSubmit} submitTitle="save" >
            {typeof value === "array" ?
            <FormMultipleInput label={label} selected={inputs[label]} multiple={label === "languages" && true}  onChange={value => handleChange({target: value})}/>
            :
            <FormInput label={label} onChange={handleChange} validate={validate_form} error={errors && errors[label]} value={inputs[label]} type={label}/>
            }
            {/* <FormInput label={label} onChange={handleChange} validate={validate_form} error={errors && errors[label]} value={inputs[label]} type={label} /> */}
        </CustomForm>
    )
}

export default AccountUpdate
