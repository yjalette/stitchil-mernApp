import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { handleResponse } from '../../helpers/dataHelper';
import { UPDATE_PASSWORD_MUTATION } from '../../pages/settingsPage/graphql/mutations';
import AuthContext from '../../context/Auth-context'
import useForm from '../../custom_hooks/useForm';
import CustomForm from '../../layout/CustomForm';
import Password from '../inputs/Password';
import ActionStatus from '../notification/ActionStatus';

const SecurityPassword = ({ token }) => {
    const { user } = useContext(AuthContext);
    const { push } = useHistory()
    const {
        inputs,
        handleChange,
        handleSubmit,
        handleClear,
        msg,
        setMsg,
        errors,
        setErrors } = useForm({}, onSubmit);
    const [post, { error }] = useMutation(UPDATE_PASSWORD_MUTATION, {
        onCompleted: data => {
            if (data) {
                return handleResponse(data.updatePassword, handleSuccess, handleFailure)
            }
        }
    })

    function handleSuccess(success_msg) {
        setMsg(success_msg);
        setErrors({});
        setTimeout(() => {
            if (token) push('/auth/login');
            setMsg("")
            handleClear();
        }, 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error })
    }

    function onSubmit() {
        const { password, new_password, confirm_password } = inputs;
        if (new_password !== confirm_password) {
            return setErrors({
                form_error: "Passwords don't match"
            })
        }
        else post({
            variables: {
                passwordInput: {
                    password, new_password
                },
                token
            }
        })
    }

    return (
        <CustomForm
            form_class="passwordForm"
            onSubmit={handleSubmit}
            submitTitle="update"
            form_msg={msg}
            form_error={errors.form_error}
        >
            {error && <ActionStatus status="error" />}
            {["password", "new_password", "confirm_password"].map(label => {
                if (label === "password" && !user) return null;
                if (label === "password" && user.googleAuth) return null
                else return <Password key={label} name={label} value={inputs[label] || ""} onChange={handleChange} />
            })}
        </CustomForm>
    )
}

export default SecurityPassword
