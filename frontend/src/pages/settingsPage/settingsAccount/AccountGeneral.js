import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import useForm from '../../../custom_hooks/useForm';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import FormInput from '../../../components/inputs/FormInput';
import { handleResponse } from '../../../helpers/dataHelper';
import CustomForm from '../../../layout/CustomForm'
import { UPDATE_GENERAL_MUTATION } from '../graphql/mutations';

const AccountGeneral = ({ currValues }) => {
    const [post, { error, data }] = useMutation(UPDATE_GENERAL_MUTATION, {
        onCompleted: data => handleResponse(data.updateGeneral, handleSuccess, handleFailure)
    });
    const { inputs, setInputs, handleChange, handleMultiChange, errors, setErrors, setMsg, msg, handleSubmit } = useForm({ fullname: "", country: [], languages: [] }, onSubmit);

    useEffect(() => {
        if (currValues) setInputs(currValues);
    }, [currValues])

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
        <>
            <FormInput label="fullname" onChange={handleChange} value={inputs["fullname"]} />
            <FormMultipleInput label="languages" selected={inputs["languages"]} multiple={true} onChange={handleMultiChange} />
            <FormMultipleInput label="country" selected={inputs["country"]} onChange={handleMultiChange} />

        </>
    </CustomForm>

}

export default AccountGeneral
