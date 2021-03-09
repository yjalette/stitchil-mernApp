import React, { useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../../custom_hooks/useForm';
import FormInput from '../../../components/inputs/FormInput';
import CustomForm from '../../../layout/CustomForm'
import AuthContext from '../../../context/Auth-context';
import { updateLocalStorage } from '../../../helpers/localStorageHelper';
import { handleResponse } from '../../../helpers/dataHelper';
import { UPDATE_USERNAME_MUTATION } from '../graphql/mutations';
import FormGroup from '../../../components/inputs/FormGroup';

const AccountUsername = ({ currValue }) => {
    const { user, setUser } = useContext(AuthContext)
    const [post] = useMutation(UPDATE_USERNAME_MUTATION, {
        onCompleted: data => handleResponse(data.updateUsername, handleSuccess, handleFailure)
    });
    const { inputs, setInputs, handleChange, errors, setErrors, msg, setMsg, handleSubmit } = useForm({ username: "" }, onSubmit);

    useEffect(() => {
        if (currValue) setInputs({ username: currValue })
    }, [currValue])

    function handleSuccess(success_msg) {
        setErrors({});
        setUser({ ...user, inputs })
        updateLocalStorage('user', inputs);
        setMsg(success_msg);
        setTimeout(() => setMsg(""), 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error });
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) post({ variables: inputs });
    }

    return (
        <CustomForm form_msg={msg} form_error={errors.form_error} onSubmit={handleSubmit}>
            <FormGroup label="username" input_component={<FormInput input_props={{
                name: "username",
                onChange: handleChange,
                value: inputs.username
            }} />} />
        </CustomForm>
    )
}

export default AccountUsername
