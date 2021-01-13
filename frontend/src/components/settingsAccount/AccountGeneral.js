import React, { useEffect } from 'react';

import useForm from '../../custom_hooks/useForm';
import FormMultipleInput from '../inputs/FormMultipleInput';
import FormInput from '../inputs/FormInput';
import { handleResponse } from '../../helpers/dataHelper';
import AccountForm from './AccountForm';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { UPDATE_GENERAL_MUTATION } from '../../pages/settingsPage/graphql/mutations';

const AccountGeneral = ({ currValues }) => {
    const { post } = useMutationHook(UPDATE_GENERAL_MUTATION, onPostCompleted);
    const { inputs, setInputs, handleChange, handleMultiChange, errors, setErrors, setMsg, msg, handleSubmit } = useForm({ fullname: "", country: [], languages: [] }, onSubmit);

    useEffect(() => {
        if (currValues) setInputs(currValues);
    }, [currValues])

    function onPostCompleted(data) {
        handleResponse(data.updateGeneral, handleSuccess, handleFailure)
    }

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


    return <AccountForm
        userInputs={(<>
            <FormInput label="fullname" onChange={handleChange} value={inputs["fullname"]} />
            <FormMultipleInput label="languages" selected={inputs["languages"]} multiple={true} onChange={value => handleMultiChange("languages", value)} />
            <FormMultipleInput label="country" selected={inputs["country"]} onChange={value => handleMultiChange("country", value)} />

        </>)}
        form_msg={msg}
        form_error={errors.form_error}
        onSubmit={handleSubmit}
    />

}

export default AccountGeneral
