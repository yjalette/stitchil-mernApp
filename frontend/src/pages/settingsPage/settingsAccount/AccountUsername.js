import React, { useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USERNAME_MUTATION } from '../graphql/mutations';
import { updateLocalStorage } from '../../../helpers/localStorageHelper';
import { handleResponse } from '../../../helpers/dataHelper';
import useForm from '../../../custom_hooks/useForm';
import FormInput from '../../../components/inputs/FormInput';
import CustomForm from '../../../layout/CustomForm'
import AuthContext from '../../../context/Auth-context';
import FormGroup from '../../../components/inputs/FormGroup';
import ActionStatus from '../../../components/notification/ActionStatus';

const AccountUsername = ({ currValue }) => {
    const { user, setUser } = useContext(AuthContext);
    const {
        inputs,
        setInputs,
        handleChange,
        msg,
        setMsg,
        errors,
        setErrors,
        handleSubmit } = useForm({ username: "" }, onSubmit);
    const [post, { data, error }] = useMutation(UPDATE_USERNAME_MUTATION, {
        onCompleted: data => {
            if (data) {
                handleResponse(data.updateUsername, handleSuccess, handleFailure)
            }
        }
    });

    useEffect(() => {
        if (currValue) setInputs({ username: currValue })
    }, [currValue])

    function handleSuccess(success_msg) {
        setMsg(success_msg)
        setErrors({});
        setUser({ ...user, inputs })
        updateLocalStorage('user', inputs);
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
            {data && <ActionStatus status="success" />}
            {error && <ActionStatus status="error" />}
            <FormGroup label="username" input_component={<FormInput input_props={{
                name: "username",
                value: inputs.username,
                onChange: handleChange
            }} />} />
        </CustomForm>
    )
}

export default AccountUsername
