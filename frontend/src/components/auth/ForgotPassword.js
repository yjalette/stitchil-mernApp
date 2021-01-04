import React, { useState } from 'react';

import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import FormInput from '../inputs/FormInput';
import AlertDismissible from '../../layout/alerts/AlertDismissible';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [sent, isSent] = useState(false);
    const { post } = usePostData("forgotpassword", onCompleted);

    function onCompleted(data) {
        console.log(data)
        if (data && data.forgotPassword) return isSent(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        post({ variables: { email } });
    }


    if (sent) return <AlertDismissible text="Please check your email for a link to create a new password" alert_class="forgotPwd-alert" />


    return (
        <CustomForm form_class="modal__form" submitTitle="submit" onSubmit={handleSubmit}>
            <FormInput label="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </CustomForm>
    )

}

export default ForgotPassword
