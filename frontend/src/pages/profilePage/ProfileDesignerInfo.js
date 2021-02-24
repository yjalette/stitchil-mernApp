import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_DESIGNER_MUTATION } from './graphql/mutations';
import { initState_designer } from './../../constants/initStates';
import SectionHeader from './../../layout/SectionHeader';
import ProfileContext from './../../context/Profile-context';
import ListItem from './../../layout/ListItem';
import useForm from './../../custom_hooks/useForm';
import CustomButton from './../../layout/button/CustomButton';
import FormMultipleInput from './../../components/inputs/FormMultipleInput';
import CustomForm from './../../layout/CustomForm';

const ProfileDesignerInfo = ({ values }) => {
    const [post, { error, data }] = useMutation(UPDATE_DESIGNER_MUTATION)
    const { logged_in_user } = useContext(ProfileContext);
    const { inputs, setInputs, handleMultiChange, handleClear, handleSubmit, editMode, toggleEditMode } = useForm(initState_designer, onSubmit);

    useEffect(() => {
        if (values) setInputs(values);
    }, [values])


    function onSubmit() {
        post({ variables: { designerInput: { ...inputs, __typename: undefined } } });
        toggleEditMode();
    }

    if (editMode && logged_in_user) return (
        <CustomForm form_class="designer__form" onSubmit={handleSubmit} onCancel={handleClear} submitTitle="save" >
            {Object.keys(initState_designer).map((label, index) => <FormMultipleInput
                key={index}
                label={label}
                onChange={handleMultiChange}
                selected={inputs[label]}
                multiple={label !== "experience"}
                allowNew={label === "education"}
            />)}
        </CustomForm>
    )
    return (
        <>
            <SectionHeader title="Designer Info">
                {logged_in_user && <CustomButton onClick={toggleEditMode} icon="fa fa-edit" btn_class="btn-icon" />}
            </SectionHeader>
            <div className="profileSection__content">
                {Object.keys(initState_designer).map(field => <ListItem key={field}
                    field={`${field}`}
                    content={inputs[field]} />)}
            </div>
        </>
    )
}

export default ProfileDesignerInfo;
