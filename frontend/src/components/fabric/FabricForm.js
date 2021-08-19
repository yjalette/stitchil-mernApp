import React from 'react'
import { useToggle } from '../../custom_hooks/useToggle'
import "./style.css"
import CustomForm from '../../layout/CustomForm'
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import FormTypeahead from '../inputs/FormTypeahead'
import CustomModal from '../../layout/CustomModal'
import FabricUpload from './FabricUpload'
import CustomButton from '../../layout/button/CustomButton'

const FabricForm = ({ inputs, onSubmit, onChange, onMultiChange, handleUpload, handleDeleteImg, errors, setErrors, file }) => {
    const [open, toggle] = useToggle(false);

    const handleSubmit = e => {
        e.preventDefault()
        const { name, color, content } = inputs;
        if (!file || name === "" || color === "" || content === "") {
            return setErrors(
                {
                    form_error: "all fields must be filled"
                }
            )
        }
        else {
            onSubmit(e)
            toggle()
        }
    }

    if (!open) return <CustomButton
        onClick={() => toggle()}
        btn_class={`${inputs._id ? `btn-icon-plain fas fa-edit` : "btn-icon-text fas fa-plus"}`}>
        {inputs._id ? `` : "fabric"}
    </CustomButton>

    return (
        <CustomModal
            modal_size="md"
            modal_title={`${inputs._id ? "update" : "create"} fabric`}
            modal_class="fabricForm__modal"
            displayWithoutBtn
            onClose={() => toggle(false)}
        >
            <CustomForm
                form_error={errors.form_error}
                onSubmit={handleSubmit}
                submitTitle="save">
                <div className="fabricForm__box">
                    {Object.keys(inputs).map((label, index) => {
                        let input_component;
                        if (["_id", "__typename", "image"].includes(label)) return null
                        else input_component = <FormInput input_props={{
                            name: label,
                            value: inputs[label],
                            onChange
                        }} />
                        return <FormGroup key={label} label={label} input_component={input_component} />
                    })}

                </div>
                <FabricUpload
                    handleUpload={handleUpload}
                    existing_img={inputs.image !== "" ? inputs.image : null}
                    handleDeleteImg={handleDeleteImg} />
            </CustomForm>

        </CustomModal>
    )
}

export default FabricForm
