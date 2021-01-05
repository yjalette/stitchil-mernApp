import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import ProfileContext from '../../context/Profile-context';
import ListItem from '../../layout/ListItem';
import IconButton from '../../layout/buttons/IconButton';
import { initState_designer } from '../../constants/initStates';
import DesignerForm from './DesignerForm';
import SectionHeader from '../../layout/SectionHeader';


const DesignerSum = ({ values }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleClear, handleSubmit, editMode, toggleEditMode } = useForm(initState_designer, onSubmit);
    const { post } = usePostData("updateDesigner");

    useEffect(() => {
        if (values) setInputs(values);
    }, [values])

    console.log(inputs)
    function onSubmit() {
        post({ variables: { designerInput: { ...inputs, __typename: undefined } } });
        toggleEditMode();
    }


    if (editMode) return <DesignerForm inputs={inputs} onChange={handleChange} onMultiChange={handleMultiChange} onSubmit={handleSubmit} onCancel={handleClear} />

    return (
        <Container className="designerSum profileSection">
            <SectionHeader title="Designer Info">
                {logged_in_user && <IconButton onClick={toggleEditMode} icon_class="fa fa-edit" />}
            </SectionHeader>
            <Container className="profileSection__content">
                {Object.keys(initState_designer).map(field => <ListItem key={field}
                    field={`${field}: `}
                    content={inputs[field]} />)}
            </Container>
        </Container>
    )
}

export default DesignerSum;
