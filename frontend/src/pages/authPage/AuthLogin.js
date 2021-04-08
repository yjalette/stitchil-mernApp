
import React, { useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router";

import { LOGIN_QUERY } from './graphql/queries';
import { onSuccess } from './helpers'
import useForm from '../../custom_hooks/useForm';
import AuthContext from '../../context/Auth-context';
import CustomForm from '../../layout/CustomForm';
import GoogleButton from './AuthGoogleBtn';
import FormInput from '../../components/inputs/FormInput';
import FormGroup from '../../components/inputs/FormGroup';
import FormCheckBox from '../../components/inputs/FormCheckBox';

const init = { email: "", password: "", remember: true }

const AuthLogin = ({ verifiedEmail }) => {
    const { setUser } = useContext(AuthContext);
    const { push } = useHistory();
    const {
        inputs,
        errors,
        setErrors,
        handleChange,
        handleSubmit } = useForm(init, onSubmit);
    const [getData] = useLazyQuery(LOGIN_QUERY, {
        onCompleted: data => {
            if (data && data.login.code) return setErrors({
                form_error: data.login.message
            });
            if (data.login.username) return onSuccess(data.login, setUser, push)
        }
    });

    const responseGoogle = (response) => {
        if (response.profileObj.email) getData({
            variables: {
                email: response.profileObj.email,
                googleAuth: true
            }
        });
    }

    function onSubmit() {
        getData({ variables: { ...inputs, verifiedEmail } });
    }

    console.log(Math.random(1))
    return (
        <>
            <CustomForm
                form_class="authLogin"
                form_error={errors.form_error}
                onSubmit={handleSubmit}>
                {["email", "password"].map(label => (
                    // <InputWrapper label={label} />
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
                <FormCheckBox
                    label="remember"
                    type="switch"
                    value={inputs.remember}
                    onChange={handleChange} />
            </CustomForm>
            {!verifiedEmail && <GoogleButton responseGoogle={responseGoogle} />}
        </>
    )

}

// const InputMemoWrapper = React.memo(({ label, value, handleChange }) => {
//     console.log(Math.random(1))
//     return (
//         <FormGroup
//             key={label}
//             label={label}
//             input_component={<FormInput
//                 input_props={{
//                     type: label,
//                     name: label,
//                     onChange: handleChange,
//                     value: value,
//                     required: true
//                 }}
//             />} />
//     )
// })

// function InputWrapper({ label }) {
//     const { inputs, errors, setErrors, handleChange, handleSubmit } = useForm(init, () => console.log("input"));
//     console.log(inputs)
//     return (
//         <InputMemoWrapper label={label} value={inputs[label]} handleChange={handleChange} />
//     )
// }

export default React.memo(AuthLogin);