import React from 'react'
import options from '../../constants/options';
import CustomForm from '../../layout/CustomForm';
import FormGroup from '../inputs/FormGroup';
import FormInput from '../inputs/FormInput';
import FormTypeahead from '../inputs/FormTypeahead';
import SelectInput from '../inputs/SelectInput';

const ProductForm = ({
    form_msg,
    errors,
    init,
    inputs,
    onChange,
    onMultiChange,
    onSubmit }) => {
    return (
        <CustomForm
            form_msg={form_msg}
            form_error={errors && errors.form_error}
            form_class="itemForm-overview"
            submitTitle={inputs._id ? "update" : "save & continue"}
            onSubmit={onSubmit}>
            {Object.keys(init).map((label, index) => {
                let input_component;
                if (Array.isArray(inputs[label])) input_component = <FormTypeahead
                    name={label}
                    value={inputs[label]}
                    onChange={onMultiChange}
                // multiple={label === "keywords"}
                // allowNew={label === "keywords"}
                />
                else if (label === "productType") input_component = <SelectInput
                    input_props={{
                        name: label,
                        value: inputs[label] || "",
                        onChange
                    }}
                    options={options.productType}
                />
                else if (label === "implementation") input_component = <SelectInput
                    input_props={{
                        name: label,
                        value: inputs[label] || "",
                        onChange
                    }}
                    options={options.implementation}
                />
                else if (label === "description") input_component = <FormInput
                    input_props={{
                        name: label,
                        value: inputs[label] || "",
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
                        value: inputs[label] || "",
                        maxLength: label === "title" ? 25 : 50,
                        onChange
                    }}
                />
                return <FormGroup
                    key={index}
                    label={label}
                    required
                    input_component={input_component}
                />
            })}
        </CustomForm>
    )
}

export default ProductForm
