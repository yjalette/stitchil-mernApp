import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { validate } from '../../validation/validate_form';
import { initState_join } from '../../constants/initStates';
import { SIGNUP_MUTATION } from './graphql/mutations';
import { onSuccess } from './helpers'
import useForm from '../../custom_hooks/useForm';
import AuthContext from '../../context/Auth-context';
import GoogleButton from './AuthGoogleBtn';
import CustomForm from '../../layout/CustomForm';
import Password from '../../components/inputs/Password';
import SelectInput from '../../components/inputs/SelectInput';
import FormTypeahead from '../../components/inputs/FormTypeahead';
import FormInput from '../../components/inputs/FormInput';
import useSlides from '../../custom_hooks/useSlides';
import FormGroup from '../../components/inputs/FormGroup';
import CustomButton from '../../layout/button/CustomButton';
import CustomAlert from '../../layout/CustomAlert';

const AuthJoin = () => {
    const { push } = useHistory()
    const { setUser } = useContext(AuthContext);
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        errors,
        setErrors,
        setMsg,
        msg } = useForm(initState_join, onSubmit);
    const [post, { data }] = useMutation(SIGNUP_MUTATION, { onCompleted });

    const props = useCallback(
        label => {
            return {
                name: label,
                value: inputs[label],
                onChange: label !== "country" ? handleChange : handleMultiChange,
                required: true
            }
        },
        [inputs]
    )

    const form_inputs = [
        {
            label: "email",
            input_component: <FormInput
                input_props={{
                    ...props("email"),
                    onBlur: () => validate_form("email", inputs.email),
                    type: "email"
                }} />
        },
        {
            label: "fullname",
            input_component: <FormInput
                input_props={{
                    ...props("fullname")
                }} />
        },
        {
            label: "username",
            input_component: <FormInput
                input_props={{
                    ...props("username"),
                    onBlur: () => validate_form("username", inputs.username)
                }} />
        },
        {
            label: "country",
            input_component: <FormTypeahead {
                ...props("country")
            }
            />
        },
        {
            label: "role",
            input_component: <SelectInput
                input_props={{
                    ...props("role")
                }}
                options={["", "designer", "buyer"]} />
        },
    ].map((input) => <FormGroup
        key={input.label}
        label={input.label}
        error={errors[input.label]}
        input_component={input.input_component}
    />)

    const { activeSlide, slides, handleForward, handleBackward } = useSlides(0, [
        <>
            {form_inputs[0]}
            <Password {...props("password")} />
            <Password {...props("confirm_password")} />
            {!inputs.googleAuth &&
                <CustomButton
                    btn_class="btn-icon-text fas fa-arrow-right"
                    onClick={() => handleForward()}>
                    continue
                </CustomButton>}
            <GoogleButton responseGoogle={responseGoogle} />
        </>,
        <>
            {form_inputs.slice(1)}
            <CustomButton
                btn_class="btn-icon-text fas fa-arrow-left backward"
                onClick={() => handleBackward()}>
                back
            </CustomButton>
        </>
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

    function validate_form(name, value) {
        const error_input = validate(name, value);
        if (error_input) setErrors({ ...errors, ...error_input });
        else if (!error_input) {
            const newErrors = { ...errors };
            delete newErrors[name]
            setErrors(newErrors)
        };
    }

    function onSubmit() {
        // if (inputs.role === "") return setErrors({
        //     role: "role can't be empty"
        // })
        if (Object.keys(errors).length === 0) {
            post({
                variables: {
                    userInput: { ...inputs, confirm_password: undefined }
                }
            })
        }
    }

    function onCompleted(data) {
        // if an error 
        if (data && data.createUser.code) {
            setErrors({ form_error: data.createUser.message });
        }
        // if googleauth and success
        if (data.createUser.username) return onSuccess(data.createUser, setUser, push);
        // if success but not googleauth - confirm email
        if (data.createUser.emailSent) {
            setMsg("We have sent an email with a confirmation link. In order to complete the sign-up process, please click the confirmation link");
        }
        return setTimeout(clearForm, 5000)
    }

    function clearForm() {
        setInputs(initState_join);
        setErrors({})
        setMsg("")
    }

    return (
        <CustomForm
            form_class="authJoin"
            form_error={errors["form_error"]}
            form_msg={msg}
            onSubmit={handleSubmit}>
            {!inputs.googleAuth ? activeSlide : slides[1]}
        </CustomForm>
    )
}

export default React.memo(AuthJoin)

