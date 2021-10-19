import React, { Children } from 'react'
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import CustomForm from '../../layout/CustomForm'
import CustomModal from '../../layout/CustomModal';
import FormGroup from '../inputs/FormGroup'
import FormInput from '../inputs/FormInput'
import VariationOptionNew from './VariationOptionNew'
import VariationOptionEdit from './VariationOptionEdit'

const VariationForm = ({
    inputs,
    handleVariationName,
    addOptVariation,
    editOptVariation,
    deleteOptVariation,
    handleSubmit,
    onModalClose,
    errors,
    children
}) => {

    const handleSave = e => {
        handleSubmit(e);
    }
    return (
        <CustomModal
            modal_size="md"
            modal_title={`
            ${!inputs._id ? "new" : "edit"} variation`}
            displayWithoutBtn
            onClose={onModalClose}
        >
            <CustomForm
                submitTitle="save variation"
                onSubmit={handleSave}
            >
                <FormGroup
                    label="variation name"
                    user_msg="ex.: fabric, color and etc"
                    required
                    input_component={<FormInput
                        input_props={{
                            name: "variationName",
                            value: inputs.variationName,
                            onChange: handleVariationName,
                            required: true
                        }}
                    />}
                />
                <FormGroup
                    label="options"
                    required
                    error={errors["options"]}
                    input_component={
                        <div className="variationForm__options wrapper">
                            {inputs.options &&
                                inputs.options.length > 0 &&
                                inputs.options.map((option, index) => {
                                    return (
                                        <VariationOptionEdit
                                            key={option.name}
                                            index={index}
                                            option={option}
                                            editOptVariation={editOptVariation}
                                            deleteOptVariation={deleteOptVariation}
                                        />
                                    )
                                })
                            }
                            <VariationOptionNew addOptVariation={addOptVariation} />
                        </div>
                    }
                />
            </CustomForm>
            {children}
        </CustomModal>
    )
}

export default VariationForm
