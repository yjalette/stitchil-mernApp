import React, { useEffect, useState } from 'react';

import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import FormMultipleInput from '../inputs/FormMultipleInput';
import FormInput from '../inputs/FormInput';

const initState = { fullname: "", country: [], languages: [] }

const AccountGeneral = ({ values }) => {
    const { post } = usePostData("updategeneral", onPostCompleted);
    const { inputs, setInputs, handleChange, handleMultiChange, errors, setErrors, handleSubmit } = useForm(initState, onSubmit);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (values) {
            setInputs(values);
            setMsg("");
        }
    }, [values])

   

    function onPostCompleted(response) {
        if (response) {
            return setMsg(`Information was successfully updated`);
        }
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) post({ variables: inputs });
    }

    console.log(inputs)

    return (
        <CustomForm form_class="account page__box" form_msg={msg} onSubmit={handleSubmit} submitTitle="save" >
             <FormInput label="fullname" onChange={handleChange} value={inputs["fullname"]}/>
            <FormMultipleInput label="languages" selected={inputs["languages"]} multiple={true}  onChange={value => handleMultiChange("languages", value)}/>
            <FormMultipleInput label="country" selected={inputs["country"]} onChange={value => console.log(value) || handleMultiChange("country", value)}/>

        </CustomForm>
    )
}

export default AccountGeneral
