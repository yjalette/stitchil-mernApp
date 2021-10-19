import React from 'react'
import { attributes } from '../../constants/attributes/attributes'
import FormGroup from '../inputs/FormGroup'
import SelectInput from '../inputs/SelectInput'

const AttributesForm = ({ values, garment_type }) => {
    return (
        <div>
            {Object.keys(attributes[garment_type]).map(attr => {
                return <FormGroup
                    label={attr}
                    input_component={<SelectInput
                        input_props={{
                            onChange: (v) => console.log(v)
                        }}
                        // defaultValue={values.find(obj => )}
                        options={attributes[garment_type][attr]}
                    />}
                />
            })}
        </div>
    )
}

export default AttributesForm
