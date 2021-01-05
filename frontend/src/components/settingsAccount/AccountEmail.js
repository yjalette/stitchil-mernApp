import React, { useEffect} from 'react';

import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';

const AccountEmail = ({ currValue }) => {
    const { post, error } = usePostData("updateemail", onPostCompleted);
    const { inputs, setInputs, handleChange, errors, handleSubmit } = useForm({email: ""}, onSubmit);

    useEffect(() => {
        if (currValue) setInputs({email: currValue})
    }, [currValue])

    function onPostCompleted(response) {
       
    }

    function onSubmit() {
        post({ variables: inputs });
    }


    return (
        <CustomForm form_class="account page__box" onSubmit={handleSubmit} submitTitle="save" >
             <FormInput label="email" onChange={handleChange} value={inputs.email.slice(5)}/>
        </CustomForm>
    )
}

export default AccountEmail
