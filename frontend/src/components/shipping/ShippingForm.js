import React from 'react'
import CustomModal from '../../layout/CustomModal'
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import SelectInput from '../inputs/SelectInput'
import shipping_carriers from '../../constants/shipping_carriers'
import CustomButton from '../../layout/button/CustomButton'
import { useToggle } from '../../custom_hooks/useToggle'

const ShippingForm = ({ inputs, onSubmit, onChange, saved, setErrors, errors }) => {
    const [open, toggle] = useToggle(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const { shippingPrice, shippingCarrier, mailClass } = inputs
        if (inputs.shippingPrice) inputs.shippingPrice = parseInt(inputs.shippingPrice);
        if (!shippingPrice || shippingPrice < 1 || shippingCarrier === "" || mailClass === "") return setErrors({
            form_error: "All fields must be filled"
        })
        else {
            onSubmit(e);
            return toggle(false);
        }
    }

    if (!open) return <CustomButton
        onClick={() => toggle(true)}
        btn_class={`${inputs._id ? "btn-icon-plain fas fa-edit" : "btn-click"}`}>
        {!inputs._id && "add shipping"}
    </CustomButton>

    return (
        <>
            <CustomModal
                modal_title={inputs._id ? "update shipping" : "create shipping"}
                modal_size="md"
                onClose={() => toggle(false)}
                displayWithoutBtn
            >
                <CustomForm
                    form_class={`shippingForm ${saved && "saved"}`}
                    form_error={errors.form_error}
                    onSubmit={handleSubmit}
                    submitTitle={saved ? "saved" : "save"}>
                    <FormGroup label="shipping carrier" input_component={<SelectInput
                        options={Object.keys(shipping_carriers)}
                        defaultValue={inputs.shippingCarrier}
                        input_props={{
                            name: "shippingCarrier",
                            onChange
                        }}

                    />} />
                    <FormGroup label="mail class" input_component={<SelectInput
                        options={shipping_carriers[inputs.shippingCarrier] || []}
                        defaultValue={inputs.mailClass}
                        input_props={{
                            name: "mailClass",
                            onChange
                        }}
                    />} />
                    <FormGroup label="shipping price" input_component={<FormInput input_props={{
                        name: "shippingPrice",
                        type: "number",
                        value: inputs.shippingPrice,
                        onChange
                    }} />} />
                    {/* 
                    <FormGroup label="free shipping" input_component={<SwitchCheckBox
                        label="freeShipping"
                        value={inputs.freeShipping}
                        onChange={(value) => console.log(value)}
                    />} /> */}

                </CustomForm>
            </CustomModal>
        </>

    )
}

export default ShippingForm
