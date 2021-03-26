import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../custom_hooks/useForm';
import { SIGNUP_MUTATION } from './graphql/mutations';
import { onSuccess } from './helpers'
import AuthContext from '../../context/Auth-context';
import { validate } from '../../validation/validate_form';
import { initState_join } from '../../constants/initStates';
import GoogleButton from './AuthGoogleBtn';
import CustomForm from '../../layout/CustomForm';
import Password from '../../components/inputs/Password';
import SelectInput from '../../components/inputs/SelectInput';
import FormTypeahead from '../../components/inputs/FormTypeahead';
import FormInput from '../../components/inputs/FormInput';
import useSlides from '../../custom_hooks/useSlides';
import FormGroup from '../../components/inputs/FormGroup';

const AuthJoin = () => {
    const { push } = useHistory()
    const { setUser } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleSubmit, errors, setErrors, setMsg, msg } = useForm(initState_join, onSubmit);
    const [post] = useMutation(SIGNUP_MUTATION, { onCompleted });

    const props = useCallback(
        label => {
            return {
                name: label,
                value: inputs[label],
                onChange: label !== "country" ? handleChange : handleMultiChange,
                // validate: validate_form,
                required: true
            }
        },
        [inputs]
    )

    const form_inputs = [
        { label: "email", input_component: <FormInput input_props={{ ...props("email"), type: "email" }} /> },
        { label: "fullname", input_component: <FormInput input_props={{ ...props("fullname") }} /> },
        { label: "username", input_component: <FormInput input_props={{ ...props("username") }} /> },
        { label: "country", input_component: <FormTypeahead {...props("country")} /> },
        { label: "role", input_component: <SelectInput input_props={{ ...props("role") }} options={["designer", "buyer"]} /> },
    ].map((input) => <FormGroup
        key={input.label}
        label={input.label}
        errors={errors[input.label]}
        input_component={input.input_component}
    />)

    const { activeSlide, buttons, slides } = useSlides(0, [
        <>
            {form_inputs[0]}
            <Password {...props("password")} />
            <Password {...props("confirm_password")} />
            <GoogleButton responseGoogle={responseGoogle} />
        </>,
        form_inputs.slice(1)

    ])

    function responseGoogle(response) {
        if (response.profileObj.email) {
            const { email, name } = response.profileObj;
            setInputs({
                ...inputs,
                email,
                fullname: name,
                googleAuth: true
            })
            setMsg("success. please finish regastration")
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

    console.log(inputs.role)

    function onCompleted(data) {
        if (data && data.createUser.code) setErrors({ form_error: data.createUser.message });
        if (data.createUser.username) return onSuccess(data.createUser, setUser, push);
        if (data.createUser.emailSent) {
            setMsg("We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link");
            setInputs(initState_join);
        }
    }

    return (
        <>
            <CustomForm form_class="authJoin" form_error={errors.form_error} form_msg={msg} onSubmit={handleSubmit}>
                {!inputs.googleAuth ? activeSlide : slides[1]}
            </CustomForm>
            {!inputs.googleAuth && buttons}
        </>
    )
}

export default React.memo(AuthJoin)

