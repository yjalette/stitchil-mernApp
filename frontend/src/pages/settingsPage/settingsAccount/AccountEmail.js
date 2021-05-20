import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_EMAIL_MUTATION } from '../graphql/mutations';
import { handleResponse } from '../../../helpers/dataHelper';
import useForm from '../../../custom_hooks/useForm';
import FormGroup from '../../../components/inputs/FormGroup';
import FormInput from '../../../components/inputs/FormInput';
import CustomForm from '../../../layout/CustomForm'
import { updateLocalStorage } from '../../../helpers/localStorageHelper';
import ActionStatus from '../../../components/notification/ActionStatus';

const AccountEmail = ({ currValue }) => {
    const {
        inputs,
        setInputs,
        handleChange,
        msg,
        setMsg,
        errors,
        setErrors,
        handleSubmit } = useForm({ email: "" }, onSubmit);
    const [post, { data, error }] = useMutation(UPDATE_EMAIL_MUTATION, {
        onCompleted: data => {
            if (data) {
                handleResponse(data.updateEmail, handleSuccess, handleFailure)
            }
        }
    });

    useEffect(() => {
        if (currValue) setInputs({ email: currValue })
    }, [currValue])

    function handleSuccess(success_msg) {
        setMsg(success_msg);
        updateLocalStorage("user", inputs);
        setErrors({});
        setTimeout(() => setMsg(""), 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error });
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            return post({ variables: inputs });
        }
    }

    return (
        <CustomForm
            form_msg={msg}
            form_error={errors.form_error}
            onSubmit={handleSubmit}>
            {error && <ActionStatus status="error" />}
            <FormGroup label="email" input_component={<FormInput input_props={{
                name: "email",
                type: "email",
                onChange: handleChange,
                value: inputs.email
            }} />} />
        </CustomForm>
    )
}

export default AccountEmail
