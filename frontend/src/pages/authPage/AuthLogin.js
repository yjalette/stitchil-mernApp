
import React, { useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router";

import useForm from '../../custom_hooks/useForm';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../../components/inputs/FormInput';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import GoogleButton from './AuthGoogleBtn';
import { LOGIN_QUERY } from './graphql/queries';
import FormGroup from '../../components/inputs/FormGroup';
import FormCheckBox from '../../components/inputs/FormCheckBox';

const AuthLogin = ({ verifiedEmail }) => {
    const { setUser } = useContext(AuthContext);
    const { push } = useHistory()
    const [getData] = useLazyQuery(LOGIN_QUERY, {
        onCompleted: data => {
            if (data && data.login.code) setErrors({ form_error: data.login.message });
            if (data.login.username) return onSuccess(data.login, setUser, push)
        }
    });
    const { inputs, errors, setErrors, handleChange, handleSubmit } = useForm({ email: "", password: "", remember: true }, onSubmit);

    const responseGoogle = (response) => {
        if (response.profileObj.email) getData({ variables: { email: response.profileObj.email, googleAuth: true } });
    }

    function onSubmit() {
        getData({ variables: { ...inputs, verifiedEmail } });
    }

    return (
        <>
            <CustomForm form_class="authLogin" onSubmit={handleSubmit} form_error={errors.form_error}>
                {["email", "password"].map(label => (
                    <FormGroup
                        key={label}
                        label={label}
                        input_component={<FormInput
                            input_props={{
                                type: label,
                                name: label,
                                onChange: handleChange,
                                value: inputs[label],
                                required: true
                            }}
                        />} />
                ))}
                <FormCheckBox label="remember" type="switch" value={inputs.remember} onChange={handleChange} />
            </CustomForm>
            {!verifiedEmail && <GoogleButton responseGoogle={responseGoogle} />}
        </>
    )

}



export default AuthLogin;