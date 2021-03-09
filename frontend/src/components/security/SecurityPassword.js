import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import AuthContext from '../../context/Auth-context'
import useForm from '../../custom_hooks/useForm';
import CustomForm from '../../layout/CustomForm';
import Password from '../inputs/Password';
import { handleResponse } from '../../helpers/dataHelper';
import { UPDATE_PASSWORD_MUTATION } from '../../pages/settingsPage/graphql/mutations';

const SecurityPassword = ({ token }) => {
    const { user } = useContext(AuthContext);
    const { push } = useHistory()
    const [post] = useMutation(UPDATE_PASSWORD_MUTATION, {
        onCompleted: data => handleResponse(data.updatePassword, handleSuccess, handleFailure)
    })
    const { inputs, handleChange, handleSubmit, setMsg, msg, errors, setErrors } = useForm({}, onSubmit);

    function handleSuccess(success_msg) {
        setErrors({});
        setMsg(success_msg);
        setTimeout(() => {
            setMsg("")
            if (token) push('/auth/login');
        }, 5000)
    }

    function handleFailure(form_error) {
        setErrors({ form_error })
    }

    function onSubmit() {
        post({ variables: { passwordInput: { ...inputs, confirm_password: undefined }, token } })
    }

    return (
        <CustomForm
            form_class="passwordForm"
            onSubmit={handleSubmit}
            submitTitle="update"
            form_msg={msg}
            form_error={errors.form_error}
        >
            {user && !user.googleAuth && <Password name="password" value={inputs["password"]} onChange={handleChange} />}
            <Password name="new_password" value={inputs["new_password"]} onChange={handleChange} />
            <Password name="confirm_password" value={inputs["confirm_password"]} onChange={handleChange} />
        </CustomForm>
    )
}

export default SecurityPassword
