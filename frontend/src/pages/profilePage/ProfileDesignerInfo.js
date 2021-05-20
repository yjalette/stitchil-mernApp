import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_DESIGNER_MUTATION } from './graphql/mutations';
import { initState_designer } from './../../constants/initStates';
import SectionHeader from './../../layout/SectionHeader';
import ProfileContext from './../../context/Profile-context';
import ListItem from './../../layout/ListItem';
import useForm from './../../custom_hooks/useForm';
import CustomButton from './../../layout/button/CustomButton';
import FormTypeahead from './../../components/inputs/FormTypeahead';
import CustomForm from './../../layout/CustomForm';
import CustomModal from '../../layout/CustomModal';
import FormGroup from '../../components/inputs/FormGroup';
import ButtonEdit from '../../layout/button/ButtonEdit';

const ProfileDesignerInfo = ({ values }) => {
    const [post] = useMutation(UPDATE_DESIGNER_MUTATION)
    const { logged_in_user } = useContext(ProfileContext);
    const {
        inputs,
        setInputs,
        handleMultiChange,
        handleCancel,
        handleSubmit,
        editMode,
        toggleEditMode } = useForm(initState_designer, onSubmit);

    useEffect(() => {
        if (values) setInputs(values);
    }, [values, setInputs])

    function onSubmit() {
        post({
            variables: {
                designerInput: {
                    ...inputs,
                    __typename: undefined
                }
            }
        });
        toggleEditMode();
    }

    if (editMode) return (
        <CustomModal
            modal_title="edit designer info"
            modal_size="md"
            onClose={handleCancel}
            displayWithoutBtn
        >
            <CustomForm
                form_class="designer__form"
                submitTitle="save"
                onSubmit={handleSubmit}
                onCancel={handleCancel}  >
                {Object.keys(initState_designer)
                    .map((label, index) => <FormGroup
                        key={index}
                        label={label}
                        input_component={
                            <FormTypeahead
                                name={label}
                                onChange={handleMultiChange}
                                value={inputs[label]}
                                multiple={label !== "experience"}
                                allowNew={label === "education"}
                            />}
                    />)}
            </CustomForm>
        </CustomModal>
    )
    return (
        <>
            <SectionHeader title="Designer Info">
                {logged_in_user && <ButtonEdit onClick={toggleEditMode} />}
            </SectionHeader>
            <div className="profileSection__content">
                {Object.keys(initState_designer).map(field => <ListItem
                    key={field}
                    field={`${field}`}
                    content={inputs[field]} />)}
            </div>
        </>
    )
}

export default ProfileDesignerInfo;
