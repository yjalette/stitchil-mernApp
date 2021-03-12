import React from 'react';

import "./style.css"
import CustomForm from '../../layout/CustomForm';
import CustomModal from '../../layout/CustomModal'
import ItemUpload from './ItemUpload';
import useSlides from '../../custom_hooks/useSlides';
import FormInput from '../inputs/FormInput';
import FormTypeahead from '../inputs/FormTypeahead';
import FormGroup from '../inputs/FormGroup';
import { input_props } from './helpers';
import { initState_item } from '../../constants/initStates';

const ItemForm = ({ form_title, errors, onChange, onMultiChange, onSubmit, onClose, inputs, media_props }) => {
    const form_inputs = (Object.keys(initState_item).map((label) => {
        if (Array.isArray(initState_item[label])) {
            return wrapInput(label, <FormTypeahead {...{
                ...input_props(label, inputs[label], onMultiChange),
                allowNew: label === "keywords",
                multiple: ["keywords", "occasion", "style"].includes(label)
            }} />)
        }

        if (label === "description") {
            return wrapInput(label, <FormInput input_props={{
                ...input_props(label, inputs[label], onChange),
                maxLength: 100,
                rows: 3,
                as: "textarea"
            }} />)
        }
        else {
            return wrapInput(label, <FormInput input_props={{
                ...input_props(label, inputs[label], onChange)
            }} />)
        }
    }));

    // form_inputs.unshift(<ItemUpload key={form_inputs.length + 1} {...media_props} />)

    const { activeSlide, buttons } = useSlides(0, [
        form_inputs.slice(0, form_inputs.length / 2),
        form_inputs.slice(form_inputs.length / 2, form_inputs.length),
        <ItemUpload {...media_props} />
    ] || [], { pagination: true })

    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="lg"
            onClose={onClose}
            modal_footer={buttons}
            displayWithoutBtn
        >
            <CustomForm
                onSubmit={onSubmit}
                form_class="itemForm"
                form_error={errors.form_error}
            >
                {activeSlide}
            </CustomForm>

        </CustomModal>
    )
}

function wrapInput(label, input_component) {
    return <FormGroup key={label} label={label} input_component={input_component} />
}

export default ItemForm


