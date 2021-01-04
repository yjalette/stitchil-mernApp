import React, { useState, useContext } from 'react';

import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';

import AlertDismissible from '../../layout/alerts/AlertDismissible';
import { useToggle } from '../../custom_hooks/useToggle';

const initState = { email: " ", message: " ", subject: " " };

const ContactContainer = () => {
    const { user } = useContext(AuthContext);
    const [isSent, toggle] = useToggle(false);
    const { inputs, handleChange, handleSubmit } = useForm(initState, onSubmit)
    const { post } = usePostData("contactus", onPostCompleted)

    function onSubmit() {
        post({ variables: inputs })
    }

    function onPostCompleted() {
        toggle(true);
        // setInputs(initState)
    }

    if (isSent) return <AlertDismissible heading="success" text="Your message has been successfully sent. We will contact you very soon!" />

    return <div></div>
    // return <NewMessage onChange={handleChange} onSubmit={handleSubmit} message={inputs.message} subject={inputs.subject} email={user ? undefined : inputs.email} className="contact__message" />
}

export default ContactContainer
