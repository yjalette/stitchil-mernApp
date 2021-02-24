import React from 'react';

import "./style.css"
import CustomForm from '../../layout/CustomForm';
import CustomModal from '../../layout/CustomModal'
import ItemUpload from './ItemUpload';
import useSlides from '../../custom_hooks/useSlides';
import FormTextarea from '../inputs/FormTextarea';
import FormInput from '../inputs/FormInput';
import FormMultipleInput from '../inputs/FormMultipleInput';
import { singleInput_props, multiInput_props, descriptionInput_props } from './helpers';

const ItemForm = ({ form_title, errors, onChange, onMultiChange, onSubmit, onClose, inputs, initState, media_props }) => {
    const form_inputs = (Object.keys(initState).map((label, index) => {
        if (Array.isArray(initState[label])) return <FormMultipleInput key={index} {...multiInput_props(label, inputs, onMultiChange)} />
        if (label === "description") return <FormTextarea key={index} {...descriptionInput_props(label, inputs, onChange)} />
        else return <FormInput key={index} {...singleInput_props(label, inputs, onChange)} />
    }))
    form_inputs.unshift(<ItemUpload key={form_inputs.length + 1} {...media_props} />)

    const { activeSlide, buttons } = useSlides(0, [
        form_inputs.slice(0, form_inputs.length / 2),
        form_inputs.slice(form_inputs.length / 2, form_inputs.length)
    ] || [], { pagination: true })
    console.log(errors)
    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="md"
            displayWithoutBtn
            onClose={onClose}
            modal_footer={buttons}
        >
            <CustomForm
                onSubmit={onSubmit}
                form_class="itemForm"
                form_error={errors.form_errors}
            >
                {activeSlide}
            </CustomForm>

        </CustomModal>
    )
}

export default ItemForm


