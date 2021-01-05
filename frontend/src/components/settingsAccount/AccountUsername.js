import React, { useEffect} from 'react';

import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';
import { updateLocalStorage } from '../../helpers/localStorageHelper';

const AccountUsername = ({ currValue }) => {
    const { post, error } = usePostData("updateusername", onPostCompleted);
    const { inputs, setInputs, handleChange, errors, setErrors, handleSubmit } = useForm({username: ""}, onSubmit);

    useEffect(() => {
        if (currValue) setInputs({username: currValue})
    }, [currValue])

    function onPostCompleted(data) {
        const response = data.updateUsername;
        console.log(data)
        // if (response && !error) {
        //     console.log(response)
        //     updateLocalStorage('user', inputs);
        // }
        // if(response.code && response.message) setErrors({form_error: response.message})
        // if(error) console.log(error)
    }

    function onSubmit() {
        post({ variables: inputs });
    }

 

    return (
        <CustomForm form_class="account page__box" form_error={errors.form_error} onSubmit={handleSubmit} submitTitle="save" >
            {error && <span>{error}</span>}
             <FormInput label="username" onChange={handleChange} value={inputs.username}/>
        </CustomForm>
    )
}

export default AccountUsername
