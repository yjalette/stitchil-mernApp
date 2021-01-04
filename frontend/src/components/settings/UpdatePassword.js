import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { validate } from '../../validation/validate_form'
import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';

import CustomForm from '../../layout/CustomForm';
import Password from '../inputs/Password';


const initState = ["password", "newPassword", "confirmPassword",];

const UpdatePassword = ({ token }) => {
    const { data, post } = usePostData("updatesecurity", onPostCompleted);
    const { inputs, errors, setErrors, handleChange, handleSubmit } = useForm({}, onSubmit);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (token) setMsg("please enter new password")
        else setMsg("");
    }, [])

    function validate_form(obj) {
        const error_input = validate(obj);
        if (error_input) setErrors({ ...errors, ...error_input });
        else if (!error_input) setErrors({});
    }

    function onPostCompleted({ updateSecurity }) {
        if (updateSecurity["success"]) setMsg(updateSecurity.message);
        if (updateSecurity["code"]) setMsg(updateSecurity.error)
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) post({ variables: { passwordInput: { ...inputs, confirmPassword: undefined }, token } });
    }


    return (
        <CustomForm form_class="account page__box settings__password" form_msg={msg} onSubmit={handleSubmit} submitTitle="save" >
            {token && data && data.updateSecurity["success"] && <Link to="/confirm/password">login</Link>}
            {initState.map((elem, i) => {
                if (token && elem === "password") return null
                return <Password key={i} label={elem} onChange={handleChange} validate={validate_form} error={errors && errors[elem]} value={inputs[elem]} />
            })}
        </CustomForm>
    )

}

export default UpdatePassword
