import React from 'react'

import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'
import CustomModal from '../../layout/CustomModal'
import SwatchUpload from './SwatchUpload'
import "./style.css"

const SwatchForm = ({ inputs, onSubmit, onChange, onMultiChange, handleUpload, handleDeleteImg, closeModal, errors }) => {

    return (
        <CustomModal
            modal_size="md"
            modal_title={`${inputs._id ? "update" : "create"} swatch`}
            modal_class="swatchForm__modal"
            btn_class={`${inputs._id ? `btn-icon-plain fas fa-edit` : "btn-icon-text fas fa-plus"}`}
            btn_title={inputs._id ? `` : "swatch"}
            timeOut={closeModal && 3000}
        >
            <CustomForm
                form_error={errors.form_error}
                onSubmit={onSubmit}
                submitTitle="save">
                <div className="swatchForm__box">
                    {Object.keys(inputs).map((label, index) => {
                        let input_component;
                        if (["_id", "__typename", "image"].includes(label)) return null
                        if (["fabric", "color"].includes(label)) input_component = <FormTypeahead
                            name={label}
                            value={inputs[label]}
                            onChange={onMultiChange}
                        />
                        else input_component = <FormInput input_props={{
                            name: label,
                            value: inputs[label],
                            onChange
                        }} />
                        return <FormGroup key={label} label={label} input_component={input_component} />
                    })}

                </div>
                <SwatchUpload
                    handleUpload={handleUpload}
                    existing_img={inputs.image !== "" ? inputs.image : null}
                    handleDeleteImg={handleDeleteImg} />
            </CustomForm>

        </CustomModal>
    )
}

export default SwatchForm
