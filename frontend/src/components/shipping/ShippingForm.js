import React from 'react'
import CustomModal from '../../layout/CustomModal'
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import SelectInput from '../inputs/SelectInput'
import shipping_carriers from '../../constants/shipping_carriers'
import CustomButton from '../../layout/button/CustomButton'
import { useToggle } from '../../custom_hooks/useToggle'

const ShippingForm = ({ inputs, onSubmit, onChange, saved, setErrors, errors, setInputs }) => {
    const [open, toggle] = useToggle(false);

    const handleCarrier = e => {
        setInputs({
            shippingCarrier: e.target.value,
            mailClass: "",
            shippingPrice: 0
        })
    }

    const handleMailClass = e => {
        setInputs({
            shippingCarrier: inputs.shippingCarrier,
            mailClass: e.target.value,
            shippingPrice: 0
        })
    }

    const handleShippingPrice = e => {
        setInputs({
            ...inputs,
            shippingPrice: parseInt(e.target.value)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const { shippingPrice, shippingCarrier, mailClass } = inputs
        // if (inputs.shippingPrice) inputs.shippingPrice = parseInt(inputs.shippingPrice);
        if (!shippingPrice || shippingPrice < 1 || shippingCarrier === "" || mailClass === "") return setErrors({
            form_error: "All fields must be filled"
        })
        else {
            onSubmit(e);
            return toggle(false);
        }
    }

    console.log(shipping_carriers[inputs.shippingCarrier])

    if (!open) return <CustomButton
        onClick={() => toggle(true)}
        btn_class={`${inputs._id ?
            "btn-icon-text fas fa-edit"
            : "btn-icon-text fas fa-plus"}`}>
        {!inputs._id && "new shipping"}
    </CustomButton>

    return (
        <>
            <CustomModal
                modal_title={inputs._id ?
                    "update shipping"
                    : "create shipping"}
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
                            onChange: handleCarrier
                        }}

                    />} />
                    {inputs.shippingCarrier &&
                        <FormGroup label="mail class" input_component={<SelectInput
                            options={shipping_carriers[inputs.shippingCarrier]}
                            defaultValue={inputs.mailClass}
                            input_props={{
                                name: "mailClass",
                                onChange: handleMailClass
                            }}
                        />} />}
                    {inputs.shippingCarrier &&
                        inputs.mailClass &&
                        <FormGroup label="shipping price" input_component={<FormInput input_props={{
                            name: "shippingPrice",
                            type: "number",
                            value: inputs.shippingPrice,
                            onChange: handleShippingPrice
                        }} />} />}
                </CustomForm>
            </CustomModal>
        </>

    )
}

export default ShippingForm
