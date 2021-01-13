import React from 'react';

import CustomForm from '../../layout/CustomForm';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { FORGOT_PASSWORD_MUTATION } from './graphql/mutations';
import FormInput from '../../components/inputs/FormInput';
import useForm from '../../custom_hooks/useForm';
import { handleResponse } from '../../helpers/dataHelper';

const AuthForgotPassword = () => {
    const { inputs, setInputs, handleChange, handleSubmit, errors, setErrors, setMsg, msg } = useForm({ email: "" }, onSubmit);
    const { post } = useMutationHook(FORGOT_PASSWORD_MUTATION, onCompleted);

    function onCompleted(data) {
        handleResponse(data.forgotPassword, handleSuccess, handleFailure);
        setInputs({ email: "" });
    }

    function handleSuccess(msg) {
        setMsg(msg)
    }

    function handleFailure(msg) {
        setErrors({ form_error: msg })
    }

    function onSubmit() {
        post({ variables: inputs });
    }

    return (
        <CustomForm form_class="modal__form" submitTitle="submit" onSubmit={handleSubmit} form_msg={msg} form_error={errors.form_error}>
            <FormInput label="email" type="email" value={inputs.email} onChange={handleChange} />
        </CustomForm>
    )

}

export default AuthForgotPassword
