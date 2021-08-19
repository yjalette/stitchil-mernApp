import React from 'react'
import { Row } from 'react-bootstrap'
import { initState_location } from '../../constants/initStates'
import useForm from '../../custom_hooks/useForm'
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'

const FormsLocation = ({ location, handleLocation }) => {
    const { inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit } = useForm(initState_location, onSubmit);

    React.useEffect(() => {
        if (location) {
            setInputs(location)
        }
    }, [location])

    function onSubmit() {
        handleLocation({
            ...inputs,
            state: inputs.state[0],
            zip: Number(inputs.zip)
        })
    }

    return (
        <CustomForm
            onSubmit={handleSubmit}
            submitTitle="save"
        >
            <FormGroup
                label="Address"
                required
                input_component={
                    <FormInput input_props={{
                        name: "address",
                        value: inputs.address,
                        placeholder: "1234 Main St",
                        onChange: handleChange,
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
                        onChange: handleChange,
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
                            onChange: handleChange,
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
                            onChange={handleMultiChange}
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
                            onChange: handleChange,
                            required: true
                        }} />
                    } />
            </Row>
        </CustomForm>
    )
}

export default FormsLocation
