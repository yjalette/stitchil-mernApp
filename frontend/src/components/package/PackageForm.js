import React from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import PackageFormFabric from './PackageFormFabric'

const PackageForm = ({ inputs, errors, onSubmit, onChange, addFabric, deleteFabric, saved }) => {

    return (
        <>
            {errors && errors.form_error && <span className="error">{errors.form_error} </span>}
            <BoxWrapper mod_class="packageForm">
                <PackageFormFabric
                    fabrics={inputs.fabrics || null}
                    addFabric={addFabric}
                    deleteFabric={deleteFabric} />
            </BoxWrapper>
            <BoxWrapper mod_class="packageForm">
                <CustomForm
                    form_class={`packageForm ${saved && "saved"}`}
                    onSubmit={onSubmit}
                    submitTitle={saved ? "saved" : "save"}>
                    <div className="packageForm__grid">
                        {Object.keys(inputs).map((label, index) => {
                            let input_component;
                            if (["_id", "__typename", "type", "itemId", "fabrics"].includes(label)) return null
                            else input_component = <FormInput input_props={{
                                name: label,
                                type: ["number", "delivery"].includes(label) ? "number" : "text",
                                value: inputs[label],
                                onChange
                            }} />
                            return <FormGroup key={label} label={label} input_component={input_component} />
                        })}
                    </div>
                </CustomForm>
            </BoxWrapper>
        </>

    )
}

export default PackageForm
