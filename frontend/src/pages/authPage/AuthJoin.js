import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '../../custom_hooks/useForm';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import { validate } from '../../validation/validate_form';
import { initState_join } from '../../constants/initStates';
import GoogleButton from './AuthGoogleBtn';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { SIGNUP_MUTATION } from './graphql/mutations';
import AuthJoinForm from './AuthJoinForm';
import CustomForm from '../../layout/CustomForm';

const AuthJoin = () => {
    const { push } = useHistory()
    const { setUser } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, errors, setErrors, setMsg, msg } = useForm(initState_join, onSubmit);
    const { data, post } = useMutationHook(SIGNUP_MUTATION, onCompleted);

    const responseGoogle = (response) => {
        if (response.profileObj.email) {
            const { email, name } = response.profileObj;
            setInputs({
                ...inputs,
                googleAuth: true,
                email,
                fullname: name
            })
        }
    }

    function validate_form(obj) {
        const error_input = validate(obj);
        if (error_input) setErrors({ ...errors, ...error_input });
        else if (!error_input) setErrors({});
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            post({
                variables: {
                    userInput: {
                        ...inputs,
                        // country: inputs.country.toString(),
                        confirm_password: undefined
                    }
                }
            })
        }
    }

    console.log(data)

    function onCompleted(data) {
        if (data && data.createUser.code) setErrors({ form_error: data.createUser.message });
        if (data.createUser.token) return onSuccess(data.createUser, setUser, push);
        if (data.createUser.emailSent) {
            setMsg("We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link");
            setInputs(initState_join);
        }

        // if (data.createUser.emailSent) return push({ pathname: '/auth/login', state: { verifiedEmail: true } })
    }

    // if (data && data.createUser.emailSent) return <AlertDismissible text="We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link" alert_class="auth-alert" />

    const form_props = { inputs, setInputs, onSubmit: handleSubmit, onChange: handleChange, onMultiChange: handleMultiChange, errors, setErrors, validate: validate_form }

    return (
        <CustomForm form_error={errors.form_error} form_msg={msg}>
            <AuthJoinForm {...form_props}>
                <GoogleButton responseGoogle={responseGoogle} />
            </AuthJoinForm>
        </CustomForm>


    )
}






export default React.memo(AuthJoin)