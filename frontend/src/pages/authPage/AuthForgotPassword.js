import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import CustomForm from '../../layout/CustomForm';
import { FORGOT_PASSWORD_MUTATION } from './graphql/mutations';
import FormInput from '../../components/inputs/FormInput';
import useForm from '../../custom_hooks/useForm';
import { handleResponse } from '../../helpers/dataHelper';
import SecurityPassword from '../../components/security/SecurityPassword';

const AuthForgotPassword = () => {
    const { token } = useParams();
    const { inputs, setInputs, handleChange, handleSubmit, errors, setErrors, setMsg, msg } = useForm({ email: "" }, onSubmit);
    const [post, { error, data }] = useMutation(FORGOT_PASSWORD_MUTATION, {
        onCompleted: data => {
            handleResponse(data.forgotPassword, handleSuccess, handleFailure);
            setInputs({ email: "" });
        }
    });

    function handleSuccess(res_msg) {
        setMsg(res_msg)
    }

    function handleFailure(res_msg) {
        setErrors({ form_error: res_msg })
    }

    function onSubmit() {
        post({ variables: inputs });
    }


    if (token) return <SecurityPassword token={token} />

    return (
        <CustomForm form_class="authForgotPwd" submitTitle="submit" onSubmit={handleSubmit} form_msg={msg} form_error={errors.form_error}>
            <FormInput label="email" type="email" value={inputs.email} onChange={handleChange} />
        </CustomForm>
    )

}

export default AuthForgotPassword
