import React from 'react';
import { Container } from 'react-bootstrap';

import FormMultipleInput from '../inputs/FormMultipleInput';
import FormInput from '../inputs/FormInput';
import CustomForm from '../../layout/CustomForm';

const DesignerForm = ({ inputs, onChange, onMultiChange, onSubmit, onCancel }) => console.log(inputs) || (
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

export default DesignerForm
