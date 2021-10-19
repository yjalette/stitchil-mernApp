import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_VARIATION_MUTATION } from './graphql/mutations';
import { initState_variation } from '../../constants/initStates';
import VariationForm from './VariationForm';
import useForm from '../../custom_hooks/useForm';
import CustomButton from '../../layout/button/CustomButton';

const VariationCreate = ({ updateQuery }) => {
    const { listingId } = useParams();
    const {
        inputs,
        setInputs,
        handleChange,
        handleSubmit,
        handleClear,
        errors,
        setErrors,
        editMode,
        toggleEditMode } = useForm(initState_variation, onSubmit);
    const [post] = useMutation(CREATE_VARIATION_MUTATION, {
        onCompleted: data => {
            if (data) {
                const newVariation = data.createVariation;
                updateQuery(prev => {
                    return {
                        listing: {
                            ...prev.listing,
                            variations: [
                                ...prev.listing.variations,
                                newVariation]
                        }
                    }
                })
                handleModalClose()
            }
        }
    })


    const addOptVariation = option => {
        setInputs({
            ...inputs,
            options: [
                ...inputs.options,
                option]
        })
    }

    function onSubmit() {
        if (inputs.options.length < 1) {
            return setErrors({
                ...errors,
                options: "options can't be empty"
            })
        }
        else post({
            variables: {
                variationInput: inputs,
                listingId
            }
        })
    }

    function handleModalClose() {
        handleClear();
        toggleEditMode()
    }

    if (!editMode) {
        return (
            <CustomButton
                onClick={toggleEditMode}
                btn_class="btn-icon-text fas fa-plus"
            >new variation</CustomButton>
        )
    }

    return (
        <VariationForm
            inputs={inputs}
            handleSubmit={handleSubmit}
            handleVariationName={handleChange}
            addOptVariation={addOptVariation}
            onModalClose={handleModalClose}
            errors={errors}
        />
    )

}

export default VariationCreate
