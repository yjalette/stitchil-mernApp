import React from 'react';

import "./style.css"
import FormInput from '../../../components/inputs/FormInput';
import FormMultipleInput from '../../../components/inputs/FormMultipleInput';
import ItemToggle from '../../../components/items/ItemToggle';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'
import ItemUpload from './ItemUpload';
import FormSteps from '../../../components/inputs/FormSteps';

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


    return (
        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="md"
            displayWithoutBtn
            onClose={onClose}
        >
            <CustomForm
                onSubmit={onSubmit}
                form_class="itemForm"
            >
                <FormSteps steps={[
                    <>
                        {form_inputs.slice(0, 2)}
                        <ItemToggle title="Item Gallery">
                            <ItemUpload {...media_props} />
                        </ItemToggle>
                    </>
                    ,
                    <>
                        {form_inputs.slice(2, form_inputs.length)}
                    </>
                ]} />

            </CustomForm>

        </CustomModal>
    )
}

export default ItemForm


