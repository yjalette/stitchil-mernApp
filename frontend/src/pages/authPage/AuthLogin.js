
import React, { useContext } from 'react';
import { Form, Container } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router";

import useForm from '../../custom_hooks/useForm';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../../components/inputs/FormInput';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import GoogleButton from './AuthGoogleBtn';
import { LOGIN_QUERY } from './graphql/queries';
import useLazyQueryHook from '../../custom_hooks/useLazyQueryHook';

const AuthLogin = ({ verifiedEmail }) => {
    console.log(verifiedEmail)
    const { setUser } = useContext(AuthContext);
    const { push } = useHistory()
    const { getData, data } = useLazyQueryHook(LOGIN_QUERY, onCompleted);
    const { inputs, errors, setErrors, handleChange, handleSubmit, handleCancel } = useForm({ email: "", password: "" }, onSubmit);

    const responseGoogle = (response) => {
        if (response.profileObj.email) getData({ variables: { email: response.profileObj.email, googleAuth: true } });
    }

    function onSubmit() {
        getData && getData({ variables: { ...inputs, verifiedEmail } });
    }

    function onCompleted(data) {
        if (data && data.login.code) setErrors({ form_error: data.login.message });
        if (data.login.token) return onSuccess(data.login, setUser, push)
    }

    return (
        <>
            <CustomForm form_class="modal__form auth__form" onSubmit={handleSubmit} onCancel={handleCancel} form_error={errors.form_error}>
                <FormInput type="email" label="email" onChange={handleChange} value={inputs.email} required="true" />
                <FormInput type="password" label="password" onChange={handleChange} value={inputs.password} required="true" />
                <Container className="text-light flex-center justify-content-start">
                    <Form.Label>remeber me</Form.Label>
                    <Form.Check label=" " type="radio" />
                </Container>
            </CustomForm>
            {!verifiedEmail && <GoogleButton responseGoogle={responseGoogle} />}
        </>
    )

}



export default AuthLogin;