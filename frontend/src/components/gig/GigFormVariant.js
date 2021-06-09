import React from 'react'

import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'
import CustomModal from '../../layout/CustomModal'

const initState = { fabric: [], color: [], price: 0, delivery: 0 }

const GigFormVariant = ({ inputs, onSubmit, onChange, onMultiChange }) => {

    return (
        <CustomModal
            modal_size="md"
            modal_title={`${inputs._id ? "update" : "create"} variant`}
            displayWithoutBtn
        >
            <CustomForm onSubmit={onSubmit}>
                {Object.keys(initState).map((label, index) => {
                    let input_component;
                    if (Array.isArray(initState[label])) input_component = <FormTypeahead {...{
                        name: label,
                        value: inputs[label],
                        onChange: onMultiChange
                    }} />
                    else input_component = <FormInput input_props={{
                        name: label,
                        type: "number",
                        value: inputs[label],
                        onChange
                    }} />
                    return <FormGroup key={label} label={label} input_component={input_component} />
                })}

            </CustomForm>
        </CustomModal>

    )
}

export default GigFormVariant
