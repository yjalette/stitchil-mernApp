import React from 'react';

import "./style.css"
import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import ItemToggle from '../../../components/items/ItemToggle';
import { useToggle } from '../../../custom_hooks/useToggle';
import CustomButton from '../../../layout/button/CustomButton';
import GroupButton from '../../../layout/button/GroupButton';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'
import ItemUpload from './ItemUpload';

const ItemForm = ({ form_title, onChange, onMultiChange, onSubmit, onClose, inputs, initState, media_props }) => {
    const [open, toggle] = useToggle(false);
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

    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="lg"
            displayWithoutBtn
            onClose={onClose}
            modal_footer={form_inputs.length > 3 && <>
                <GroupButton group_class={`${open && "justify-content-start"}`}>
                    <CustomButton onClick={toggle} icon={`fa fa-arrow-${!open ? "right" : "left"}`} btn_class="btn-icon" />
                </GroupButton> </>}
        >
            <CustomForm
                onSubmit={onSubmit}
                form_class={`${!open && form_inputs.length > 3 && "itemForm-hideButton"} itemForm`}
            >
                {!open &&
                    <> {form_inputs.slice(0, 3)}
                        <ItemToggle title="Item Gallery">
                            <ItemUpload {...media_props} />
                        </ItemToggle>  </>}
                {open && form_inputs.length >= 4 && form_inputs.slice(3, form_inputs.length)}
            </CustomForm>

        </CustomModal>
    )
}

export default ItemForm


