import React, { useEffect } from 'react'
import { initState_option } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import GroupButton from '../../layout/button/GroupButton';
import CustomModal from '../../layout/CustomModal';
import VariationOptionInputs from './VariationOptionInputs';

const VariationOptionEdit = ({
    option, index,
    editOptVariation,
    deleteOptVariation }) => {
    const { inputs, setInputs, handleChange, setErrors, errors } = useForm(initState_option)
    const [open, toggle] = useToggle();

    useEffect(() => {
        if (option) setInputs(option)
    }, [option]);

    const handleOption = () => {
        if (inputs.priceIncrease) {
            inputs.priceIncrease = parseInt(inputs.priceIncrease)
        }
        if (!inputs.name) return setErrors({
            ...errors,
            name: "name can't be empty"
        })
        else {
            editOptVariation(inputs, index);
            toggle()
        }
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


    if (!open) return (
        <CustomButton
            onClick={toggle}
            btn_class="
            btn-icon-text 
            fas fa-edit 
            variationForm__optionName 
            variation--optionName">
            {inputs.name}
        </CustomButton>
    )

    return (
        <>
            <CustomModal
                modal_size="sm"
                modal_title="edit option"
                displayWithoutBtn
                onClose={() => toggle()}
            >
                <VariationOptionInputs
                    inputs={inputs}
                    onImageSelect={handleOptionImage}
                    onImageDelete={handleImageDelete}
                    onChange={handleChange}
                    errors={errors}
                />
                <GroupButton>
                    <CustomButton
                        btn_class="btn-click red"
                        onClick={() => deleteOptVariation(inputs._id)}
                    >delete</CustomButton>
                    <CustomButton
                        btn_class="btn-click"
                        onClick={handleOption}
                    >update</CustomButton>
                </GroupButton>
            </CustomModal>
        </>

    )
}

export default VariationOptionEdit
