import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '../../custom_hooks/useForm';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { SIGNUP_MUTATION } from './graphql/mutations';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import { validate } from '../../validation/validate_form';
import { initState_join } from '../../constants/initStates';
import GoogleButton from './AuthGoogleBtn';
import CustomForm from '../../layout/CustomForm';
import Password from '../../components/inputs/Password';
import SelectInput from '../../components/inputs/SelectInput';
import FormMultipleInput from '../../components/inputs/FormMultipleInput';
import FormInput from '../../components/inputs/FormInput';
import FormSteps from '../../components/inputs/FormSteps';
import { Button } from 'react-bootstrap';

const AuthJoin = () => {
    const { push } = useHistory()
    const { setUser } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, errors, setErrors, setMsg, msg } = useForm(initState_join, onSubmit);
    const { error, post } = useMutationHook(SIGNUP_MUTATION, onCompleted);

    const props = useCallback(
        label => {
            return {
                label,
                value: inputs[label],
                onChange: handleChange,
                type: label === "email" && "email",
                validate: validate_form,
                error: errors[label],
                required: true
            }
        },
        [inputs]
    )

    const responseGoogle = (response) => {
        if (response.profileObj.email) {
            const { email, name } = response.profileObj;
            setInputs({
                ...inputs,
                email,
                fullname: name,
                googleAuth: true
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
                    userInput: { ...inputs, confirm_password: undefined }
                }
            })
        }
    }

    function onCompleted(data) {
        if (data && data.createUser.code) setErrors({ form_error: data.createUser.message });
        if (data.createUser.token) return onSuccess(data.createUser, setUser, push);
        if (data.createUser.emailSent) {
            setMsg("We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link");
            setInputs(initState_join);
        }
    }

    const form_parts = [<>
        <FormInput {...props("email")} />
        <Password {...props("password")} />
        <Password {...props("confirm_password")} />
        <GoogleButton responseGoogle={responseGoogle} />
    </>,
    <>
        <FormInput {...props("fullname")} />
        <FormInput {...props("username")} />
        <FormMultipleInput label="country" required={true} error={errors.country} selected={inputs.country} onChange={handleMultiChange} />
        <SelectInput {...props("role")} options={["designer", "buyer"]} required={true} />
        <Button type="submit" className="btn-form customButton float-right" onSubmit={handleSubmit}>submit</Button>
    </>]

    return (
        <CustomForm form_class="authJoin" form_error={errors.form_error} form_msg={msg}>
            {!inputs.googleAuth ? <FormSteps steps={form_parts} /> : form_parts[1]}
        </CustomForm>
    )
}






export default React.memo(AuthJoin)