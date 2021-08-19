import React from 'react'
import { Row } from 'react-bootstrap'
import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormTypeahead from './FormTypeahead'

const AddressInput = ({ inputs, onChange }) => {
    // const { inputs, setInputs } = useForm(initState_location);

    return (
        <>
            <FormGroup
                label="Address"
                required
                input_component={
                    <FormInput input_props={{
                        name: "address",
                        value: inputs.address,
                        placeholder: "1234 Main St",
                        onChange: onChange,
                        required: true

                    }} />
                } />
            <FormGroup
                label="Address 2"
                required
                input_component={
                    <FormInput input_props={{
                        name: "address2",
                        value: inputs.address2,
                        placeholder: "Apartment, studio, or floor",
                        onChange: onChange,
                        required: true
                    }} />
                } />
            <Row className="flex-center justify-content-around">
                <FormGroup
                    label="City"
                    required
                    input_component={
                        <FormInput input_props={{
                            name: "city",
                            value: inputs.city,
                            onChange: onChange,
                            required: true
                        }} />
                    } />
                <FormGroup
                    label="State"
                    required
                    input_component={
                        <FormTypeahead
                            name="state"
                            value={inputs.state}
                            required={true}
                            onChange={(value, name) => onChange({ target: { value, name } })}
                        />
                    } />

                <FormGroup
                    label="Zip Code"
                    required
                    input_component={
                        <FormInput input_props={{
                            name: "zip",
                            value: inputs.zip,
                            type: "tel",
                            minLength: "5",
                            maxLength: "5",
                            onChange: onChange,
                            required: true
                        }} />
                    } />
            </Row>
        </>
    )
}

export default AddressInput
