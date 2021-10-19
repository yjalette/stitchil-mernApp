import React from 'react'
import { initState_option } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import CustomModal from '../../layout/CustomModal';
import VariationOptionInputs from './VariationOptionInputs';

const VariationOptionNew = ({ addOptVariation }) => {
    const [open, toggle] = useToggle();
    const { inputs, setInputs, handleChange, handleClear, errors, setErrors } = useForm(initState_option)

    const handleOption = () => {
        if (inputs.priceIncrease) {
            inputs.priceIncrease = parseInt(inputs.priceIncrease)
        }
        if (!inputs.name) return setErrors({
            name: "name required"
        })
        else addOptVariation(inputs);
        handleClose()
    }

    const handleOptionImage = id => {
        setInputs({
            ...inputs,
            imageId: id
        })
    }

    const handleImageDelete = () => {
        setInputs({
            ...inputs,
            imageId: undefined
        })
    }

    function handleClose() {
        toggle();
        handleClear();
    }


    if (!open) return (
        <>
            <CustomButton
                onClick={toggle}
                btn_class="btn-icon-text fas fa-plus mx-2">
                new option
            </CustomButton>
        </>
    )

    return (
        <>
            <CustomModal
                modal_size="sm"
                modal_title="new option"
                displayWithoutBtn
                onClose={handleClose}
            >
                <VariationOptionInputs
                    inputs={inputs}
                    onChange={handleChange}
                    onImageSelect={handleOptionImage}
                    onImageDelete={handleImageDelete}
                    errors={errors}
                />

                <CustomButton
                    btn_class="btn-click float-right"
                    onClick={handleOption}
                >add</CustomButton>
            </CustomModal>
        </>
    )
}

export default VariationOptionNew
