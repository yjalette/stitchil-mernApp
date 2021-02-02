import React from 'react';

import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import { useToggle } from '../../../custom_hooks/useToggle';
import CustomButton from '../../../layout/button/CustomButton';
import GroupButton from '../../../layout/button/GroupButton';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'
import PageMenu from '../../../layout/PageMenu';
import ItemUpload from './ItemUpload';

const ItemForm = ({ form_title, onChange, onMultiChange, onSubmit, onClose, inputs, initState, media_props }) => {
    const [open, toggle] = useToggle(false);

    const form_inputs = (Object.keys(initState).map((label, index) => {
        if (Array.isArray(initState[label])) return console.log(label) || <FormMultipleInput
            key={index}
            label={label}
            selected={inputs[label]}
            onChange={(value) => onMultiChange(label, value)}
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

    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="lg"
            displayWithoutBtn
            onClose={onClose}
            modal_footer={form_inputs.length > 2 && <>
                <GroupButton group_class={`${open && "justify-content-start"}`}>
                    <CustomButton onClick={toggle} icon={`fa fa-arrow-${!open ? "right" : "left"}`} btn_class="btn-icon" />
                </GroupButton> </>}
        >
            <PageMenu items={["Content", "Gallery"]} />
            <CustomForm form_class={`${open && "itemForm-hideButton"} itemForm`}
                submitTitle="save"
                onSubmit={onSubmit}
            >
                {/* {!open && <ItemUpload {...media_props} />} */}
                {form_inputs}
                {/* {!open && <> {form_inputs.slice(0, 4)} </>}
                {open && form_inputs.length >= 4 && form_inputs.slice(4, form_inputs.length)} */}
            </CustomForm>
        </CustomModal>
    )
}

export default ItemForm


