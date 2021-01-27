import React from 'react';
import { Container } from 'react-bootstrap';
import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import CustomForm from '../../../layout/CustomForm';

const DesignerUpdate = ({ inputs, onChange, onMultiChange, onSubmit, onCancel }) => {

    return (
        <Container className="designerSum profileSection">
            <CustomForm form_class="designer__form" onSubmit={onSubmit} onCancel={onCancel} submitTitle="save" >
                <FormMultipleInput label="skills" onChange={value => onMultiChange("skills", value)} selected={inputs.skills} multiple={true} />
                <FormMultipleInput label="styles" onChange={value => onMultiChange("styles", value)} multiple={true} selected={inputs.styles} />
                <FormMultipleInput label="experience" onChange={value => onMultiChange("experience", value)} selected={inputs.experience} />
                <FormInput label="education" onChange={onChange} value={inputs.education} />
                {/* <FormInput label="about" onChange={onChange} value={inputs.about} /> */}
            </CustomForm>
        </Container>

    )
}


export default DesignerUpdate
