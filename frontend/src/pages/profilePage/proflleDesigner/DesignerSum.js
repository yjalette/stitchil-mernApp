import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';




import { useToggle } from '../../../custom_hooks/useToggle';
import DesignerUpdate from './DesignerUpdate';
import { initState_designer } from '../../../constants/initStates';
import SectionHeader from '../../../layout/SectionHeader';
import ProfileContext from '../../../context/Profile-context';
import IconButton from '../../../layout/buttons/IconButton';
import ListItem from '../../../layout/ListItem';
import useForm from '../../../custom_hooks/useForm';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import { UPDATE_DESIGNER_MUTATION } from '../graphql/mutations';

const DesignerSum = ({ values }) => {
    const { post } = useMutationHook(UPDATE_DESIGNER_MUTATION)
    const { logged_in_user, updateQuery } = useContext(ProfileContext);
    const { inputs, setInputs, handleChange, handleMultiChange, handleClear, handleSubmit, editMode, toggleEditMode } = useForm(initState_designer, onSubmit);

    useEffect(() => {
        if (values) setInputs(values);
    }, [values])

    // const handleUpdate = () => {
    //     updateQuery(prev => {
    //         console.log(prev)
    //         return {
    //             ...prev,
    //             portfolio: inputs
    //         }
    //     })
    // }

    function onSubmit() {
        post({ variables: { designerInput: { ...inputs, __typename: undefined } } });
        toggleEditMode();
    }

    if (editMode) return <DesignerUpdate inputs={inputs} onChange={handleChange} onMultiChange={handleMultiChange} onSubmit={handleSubmit} onCancel={handleClear} />

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
