import React from 'react'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import VariationOptionImages from './VariationOptionImages'

const VariationOptionInputs = ({ inputs, onChange, onImageSelect, onImageDelete, errors }) => {
    return (
        <>
            <FormGroup
                label="option name"
                error={errors.name}
                required={true}
                input_component={
                    <FormInput
                        input_props={{
                            name: "name",
                            value: inputs.name,
                            onChange
                        }}
                    />
                }
            />
            <FormGroup
                label="buyer note"
                input_component={
                    <FormInput
                        input_props={{
                            name: "note",
                            value: inputs.note,
                            onChange
                        }}
                    />
                }
            />
            <FormGroup
                label="price increase $"
                input_component={
                    <FormInput
                        input_props={{
                            name: "priceIncrease",
                            value: inputs.priceIncrease,
                            type: "number",
                            onChange
                        }}
                    />
                }
            />
            <FormGroup
                label="link an image"
                input_component={
                    <VariationOptionImages
                        imageId={inputs.imageId === "" ? null : inputs.imageId}
                        onImageSelect={onImageSelect}
                        onImageDelete={onImageDelete}
                    />
                }
            />

        </>
    )
}

export default VariationOptionInputs
