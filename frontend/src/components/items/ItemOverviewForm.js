import { useMutation } from '@apollo/react-hooks';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { initState_item_overview } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import CustomForm from '../../layout/CustomForm';
import FormGroup from '../inputs/FormGroup';
import FormInput from '../inputs/FormInput';
import FormTypeahead from '../inputs/FormTypeahead';

const ItemOverviewForm = ({ init, inputs, onChange, onMultiChange, onSubmit }) => {
    console.log(inputs)
    return (
        <CustomForm
            form_class="itemForm-overview"
            submitTitle="save"
            onSubmit={onSubmit}>
            {Object.keys(init).map((label, index) => {
                let input_component;
                if (Array.isArray(inputs[label])) input_component = <FormTypeahead
                    name={label}
                    value={inputs[label]}
                    onChange={onMultiChange}
                    multiple={label === "keywords"}
                    allowNew={label === "keywords"}
                />
                else if (label === "description") input_component = <FormInput
                    input_props={{
                        name: label,
                        value: inputs[label],
                        as: "textarea",
                        maxLength: 50,
                        placeholder: "max 50 char",
                        rows: 3,
                        onChange
                    }}
                />
                else input_component = <FormInput
                    input_props={{
                        name: label,
                        value: inputs[label],
                        onChange
                    }}
                />
                return <FormGroup
                    key={index}
                    label={label}
                    input_component={input_component}
                />
            })}
        </CustomForm>
    )
}

export default ItemOverviewForm
