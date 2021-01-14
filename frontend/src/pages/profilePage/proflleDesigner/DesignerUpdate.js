import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import useMutationHook from '../../../custom_hooks/useMutationHook';
import CustomForm from '../../../layout/CustomForm';
import { UPDATE_DESIGNER_MUTATION } from '../graphql/mutations';


const DesignerUpdate = ({ inputs, onChange, onMultiChange, onSubmit, onCancel }) => {

    return (
        <Container className="designerSum profileSection">
            <CustomForm form_class="designer__form" onSubmit={onSubmit} onCancel={onCancel} submitTitle="save" >
                <FormMultipleInput label="skills" onChange={value => onMultiChange("skills", value)} selected={inputs.skills} multiple={true} />
                <FormMultipleInput label="style" onChange={value => onMultiChange("style", value)} multiple={true} selected={inputs.style} />
                <FormMultipleInput label="experience" onChange={value => onMultiChange("experience", value)} selected={inputs.experience} />
                <FormInput label="education" onChange={onChange} value={inputs.education} />
                {/* <FormInput label="about" onChange={onChange} value={inputs.about} /> */}
            </CustomForm>
        </Container>

    )
}


export default DesignerUpdate
