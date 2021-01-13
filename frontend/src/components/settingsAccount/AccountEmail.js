import React, { useEffect } from 'react';

import useForm from '../../custom_hooks/useForm';
import FormInput from '../inputs/FormInput';
import AccountForm from './AccountForm';
import { handleResponse } from '../../helpers/dataHelper';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { UPDATE_EMAIL_MUTATION } from '../../pages/settingsPage/graphql/mutations';

const AccountEmail = ({ currValue }) => {
    const { post, error } = useMutationHook(UPDATE_EMAIL_MUTATION, onPostCompleted);
    const { inputs, setInputs, handleChange, errors, setErrors, setMsg, msg, handleSubmit } = useForm({ email: "" }, onSubmit);

    useEffect(() => {
        if (currValue) setInputs({ email: currValue })
    }, [currValue])

    function onPostCompleted(data) {
        handleResponse(data.updateEmail, handleSuccess, handleFailure)
    }

    function handleSuccess(success_msg) {
        setErrors({});
        setMsg(success_msg);
        setTimeout(() => setMsg(""), 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error });
    }

    function onSubmit() {
        post({ variables: inputs });
    }

    return <AccountForm
        userInputs={<FormInput label="email" type="email" onChange={handleChange} value={inputs.email} />}
        form_msg={msg}
        form_error={errors.form_error}
        onSubmit={handleSubmit}
    />
}

export default AccountEmail
