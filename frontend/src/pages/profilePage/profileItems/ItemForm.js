import React from 'react';

import "./style.css"
import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'
import ItemUpload from './ItemUpload';
import useSlides from '../../../custom_hooks/useSlides';

const ItemForm = ({ form_title, onChange, onMultiChange, onSubmit, onClose, inputs, initState, media_props }) => {
    const form_inputs = (Object.keys(initState).map((label, index) => {
        if (Array.isArray(initState[label])) return console.log(label) || <FormMultipleInput
            key={index}
            label={label}
            selected={inputs[label]}
            onChange={onMultiChange}
            allowNew={label === "keywords"}
            multiple={label !== "category" && true}
        />
        else return <FormInput
            key={index}
            type={Number.isInteger(inputs[label]) && "number"}
            label={label}
            value={inputs[label]}
            onChange={onChange}
        />
    }))
    const { activeSlide, buttons } = useSlides(0, [
        form_inputs.slice(0, form_inputs.length / 2),
        form_inputs.slice(form_inputs.length / 2, form_inputs.length),
        <ItemUpload {...media_props} />
    ] || [], { pagination: true })

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
            >
                {activeSlide}

            </CustomForm>

        </CustomModal>
    )
}

export default ItemForm


