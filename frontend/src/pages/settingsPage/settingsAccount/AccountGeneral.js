import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_GENERAL_MUTATION } from '../graphql/mutations';
import { general_initstate } from './initStates';
import { handleResponse } from '../../../helpers/dataHelper';
import useForm from '../../../custom_hooks/useForm';
import FormTypeahead from '../../../components/inputs/FormTypeahead';
import FormInput from '../../../components/inputs/FormInput';
import CustomForm from '../../../layout/CustomForm'
import FormGroup from '../../../components/inputs/FormGroup';
import ActionStatus from '../../../components/notification/ActionStatus';

const AccountGeneral = ({ currValues }) => {
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        msg,
        setMsg,
        errors,
        setErrors,
        handleSubmit } = useForm(general_initstate, onSubmit);
    const [post, { error, data }] = useMutation(UPDATE_GENERAL_MUTATION, {
        onCompleted: data => {
            if (data) {
                handleResponse(data.updateGeneral, handleSuccess, handleFailure)
            }
        }
    });

    useEffect(() => {
        if (currValues) setInputs(currValues);
    }, [currValues, setInputs])

    function handleSuccess(success_msg) {
        setErrors({});
        setMsg(success_msg);
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
            form_error={errors.form_error} onSubmit={handleSubmit}>
            {error && <ActionStatus status="error" />}
            <FormGroup label="fullname" input_component={<FormInput input_props={{
                name: "fullname",
                onChange: handleChange,
                value: inputs.fullname || ""
            }} />} />
            <FormGroup label="languages" input_component={<FormTypeahead
                name="languages"
                value={inputs.languages}
                multiple={true}
                onChange={handleMultiChange} />} />
            <FormGroup label="country" input_component={<FormTypeahead
                name="country"
                value={inputs.country}
                onChange={handleMultiChange} />} />
        </CustomForm>
    )

}

export default AccountGeneral
