import React from 'react'
import { Image } from 'react-bootstrap'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomForm from '../../layout/CustomForm'
import SectionWrapper from '../../layout/SectionWrapper'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import SwatchData from '../swatch/SwatchData'
import PackageFormSwatches from './PackageFormSwatches'

const PackageForm = ({ inputs, errors, onSubmit, onChange, addSwatch, deleteSwatch, saved }) => {

    return (
        <>
            {errors && errors.form_error && <span className="error">{errors.form_error} </span>}
            <BoxWrapper box_class="packageForm">
                <SwatchData
                    ids={inputs.swatches}
                    childComponent={(swatches) => {
                        return (
                            <PackageFormSwatches
                                swatches={swatches}
                                addSwatch={addSwatch}
                                deleteSwatch={deleteSwatch} />
                        )
                    }} />
            </BoxWrapper>
            <BoxWrapper box_class="packageForm">
                <CustomForm
                    form_class={`packageForm ${saved && "saved"}`}
                    onSubmit={onSubmit}
                    submitTitle={saved ? "saved" : "save"}>
                    <div className="packageForm__grid">
                        {Object.keys(inputs).map((label, index) => {
                            let input_component;
                            if (["_id", "__typename", "type", "itemId", "swatches"].includes(label)) return null
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
