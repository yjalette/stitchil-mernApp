import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import JoinForm from './JoinForm';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import AlertDismissible from '../../layout/alerts/AlertDismissible';
import { validate } from '../../validation/validate_form';
import { initState_join } from '../../constants/initStates';
import GoogleButton from './GoogleButton';


const Join = () => {
    const { push } = useHistory()
    const { setUser } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit, errors, setErrors } = useForm(initState_join, onSubmit);
    const { data, post } = usePostData("join", onCompleted);

    const responseGoogle = (response) => {
        if (response.profileObj.email) {
            console.log(response.profileObj)
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
                        country: inputs.country.toString(),
                        confirmPassword: undefined
                    }
                }
            })
        }
    }

    console.log(data)

    function onCompleted(data) {
        if (data && data.createUser.code) setErrors({ form_error: data.createUser.message });
        if (data.createUser.token) return onSuccess(data.createUser, setUser, push);
    }

    if (data && data.createUser.emailSent) return <AlertDismissible text="We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link" alert_class="auth-alert" />

    const form_props = { inputs, setInputs, onChange: handleChange, onSubmit: handleSubmit, errors, setErrors, validate: validate_form }

    return (
        <Form className="modal__form auth__form" onSubmit={handleSubmit}>
            {errors.form_error && <span className="error">{errors.form_error}</span>}
            <JoinForm {...form_props}>
                <GoogleButton responseGoogle={responseGoogle} />
            </JoinForm>

        </Form>
    )
}






export default React.memo(Join)