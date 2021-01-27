import React from 'react';

import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import useSlides from '../../../custom_hooks/useSlides';
import { useToggle } from '../../../custom_hooks/useToggle';
import CustomButton from '../../../layout/button/CustomButton';
import GroupButton from '../../../layout/button/GroupButton';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'

const ItemForm = ({ form_title, onChange, onMultiChange, onSubmit, onCancel, inputs, initState, media }) => {
    const [open, toggle] = useToggle(false);

    const form_inputs = (Object.keys(initState).map((label, index) => {
        if (Array.isArray(inputs[label])) return <FormMultipleInput
            key={index}
            label={label}
            selected={inputs[label]}
            onChange={onMultiChange}
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

    console.log(form_inputs)
    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="md"
            btn_class={`${form_title === "update" ? "fa fa-edit" : "fa fa-plus"} btn-icon`}
            onClose={onCancel}
            modal_footer={form_inputs.length > 2 && <>
                <GroupButton group_class={`${open && "justify-content-start"}`}>
                    <CustomButton onClick={toggle} icon={`fa fa-arrow-${!open ? "right" : "left"}`} btn_class="btn-icon" />
                </GroupButton> </>}
        >
            <CustomForm form_class="itemForm"
                submitTitle="save"
                onSubmit={onSubmit}
            >
                {!open && <> {media} {form_inputs.slice(0, 2)} </>}
                {open && form_inputs.length > 2 && form_inputs.slice(2, form_inputs.length)}
            </CustomForm>
        </CustomModal>
    )
}

export default ItemForm


