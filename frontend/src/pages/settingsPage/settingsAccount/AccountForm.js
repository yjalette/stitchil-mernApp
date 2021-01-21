import React from 'react';
import CustomForm from '../../../layout/CustomForm'

const AccountForm = ({ userInputs, form_msg, form_error, onSubmit }) => {
    return (
        <CustomForm form_class="account page__box" form_msg={form_msg} form_error={form_error} onSubmit={onSubmit} submitTitle="save" >
            {userInputs}
        </CustomForm>
    )
}

export default AccountForm
