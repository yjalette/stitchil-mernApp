import React, { useEffect, useContext } from 'react';

import useForm from '../../custom_hooks/useForm';
import FormInput from '../inputs/FormInput';
import { updateLocalStorage } from '../../helpers/localStorageHelper';
import AuthContext from '../../context/Auth-context';
import { handleResponse } from '../../helpers/dataHelper';
import AccountForm from './AccountForm';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { UPDATE_USERNAME_MUTATION } from '../../pages/settingsPage/graphql/mutations';

const AccountUsername = ({ currValue }) => {
    const { user, setUser } = useContext(AuthContext)
    const { post, error } = useMutationHook(UPDATE_USERNAME_MUTATION, onPostCompleted);
    const { inputs, setInputs, handleChange, errors, setErrors, msg, setMsg, handleSubmit } = useForm({ username: "" }, onSubmit);

    useEffect(() => {
        if (currValue) setInputs({ username: currValue })
    }, [currValue])

    function onPostCompleted(data) {
        handleResponse(data.updateUsername, handleSuccess, handleFailure)
    }

    function handleSuccess(success_msg) {
        setErrors({});
        setUser({ ...user, inputs })
        updateLocalStorage('user', inputs);
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
        userInputs={<FormInput label="username" onChange={handleChange} value={inputs.username} />}
        form_msg={msg}
        form_error={errors.form_error}
        onSubmit={handleSubmit}
    />
}

export default AccountUsername
