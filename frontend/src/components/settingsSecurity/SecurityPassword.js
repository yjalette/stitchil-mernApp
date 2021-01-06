import React, { useContext } from 'react'

import AuthContext from '../../context/Auth-context'
import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import CustomForm from '../../layout/CustomForm';
import Password from '../inputs/Password';
import { handleResponse } from '../../helpers/dataHelper';

const SecurityPassword = () => {
    const {user} = useContext(AuthContext);
    const {post, error} = usePostData("updatepassword", onPostCompleted)
    const {inputs, handleChange, handleSubmit, setMsg, msg, errors, setErrors} = useForm({}, onSubmit);

   function onPostCompleted(data){
        handleResponse(data.updatePassword, handleSuccess, handleFailure)
   }

   function handleSuccess(success_msg){
    setErrors({});
    setMsg(success_msg);
    setTimeout(()=> setMsg(""), 5000)
   }

   function handleFailure(form_error){
       setErrors({form_error})
   }

    function onSubmit(){
        post({variables: {passwordInput: { ...inputs, confirm_password: undefined}}})
    }

    return (
        <CustomForm 
        form_class="passwordForm"
        onSubmit={handleSubmit}
        submitTitle="update"
        form_msg={msg}
        form_error={errors.form_error}
        >
          {!user.googleAuth && <Password label="password" value={inputs["password"]} onChange={handleChange}/>}
           <Password  label="new_password" value={inputs["new_password"]} onChange={handleChange}/>
           <Password  label="confirm_password" value={inputs["confirm_password"]} onChange={handleChange}/>
        </CustomForm>
    )
}

export default SecurityPassword