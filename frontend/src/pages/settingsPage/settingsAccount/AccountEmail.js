import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../../custom_hooks/useForm';
import FormInput from '../../../components/inputs/FormInput';
import CustomForm from '../../../layout/CustomForm'
import { handleResponse } from '../../../helpers/dataHelper';
import { UPDATE_EMAIL_MUTATION } from '../graphql/mutations';

const AccountEmail = ({ currValue }) => {
    const { inputs, setInputs, handleChange, errors, setErrors, setMsg, msg, handleSubmit } = useForm({ email: "" }, onSubmit);
    const [post] = useMutation(UPDATE_EMAIL_MUTATION, {
        onCompleted: data => handleResponse(data.updateEmail, handleSuccess, handleFailure)
    });

    useEffect(() => {
        if (currValue) setInputs({ email: currValue })
    }, [currValue])


    function handleSuccess(success_msg) {
        setErrors({});
        setMsg(success_msg);
        setTimeout(() => setMsg(""), 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error });
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) post({ variables: inputs });
    }

    return <CustomForm form_msg={msg} form_error={errors.form_error} onSubmit={handleSubmit}>
        <FormInput label="email" type="email" onChange={handleChange} value={inputs.email} />
    </CustomForm>
}

export default AccountEmail
