import React from 'react'
import { Row } from 'react-bootstrap'

import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'

const AddressForm = ({ inputs, onChange, onMultiChange, onSubmit }) => {


    return (
        <CustomForm
            onSubmit={onSubmit}
            submitTitle="save"
        >
            <FormGroup
                label="Address"
                required
                input_component={
                    <FormInput input_props={{
                        name: "address1",
                        value: inputs.address1,
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
                        required: false
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
                            onChange={onMultiChange}
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
        </CustomForm>
    )
}

export default AddressForm
