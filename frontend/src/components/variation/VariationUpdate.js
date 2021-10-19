import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_VARIATION_MUTATION } from './graphql/mutations';
import { initState_variation } from '../../constants/initStates';
import useForm from '../../custom_hooks/useForm';
import VariationForm from './VariationForm';
import VariationDelete from './VariationDelete';
import GroupButton from '../../layout/button/GroupButton';
import CustomButton from '../../layout/button/CustomButton';
import "./style.css"

const VariationUpdate = ({ variation, updateQuery }) => {
    const {
        inputs,
        setInputs,
        handleChange,
        handleSubmit,
        editMode,
        toggleEditMode,
        errors,
        setErrors } = useForm(initState_variation, onSubmit);
    const [post] = useMutation(UPDATE_VARIATION_MUTATION, {
        onCompleted: data => {
            const updatedVariation = data.updateVariation;
            updateQuery(prev => {
                const newState = { ...prev.listing };
                const index = newState.variations
                    .findIndex(v => v._id === updatedVariation._id);
                newState.variations
                    .splice(index, 1, updatedVariation)
                return {
                    listing: newState
                }
            })
            toggleEditMode()
        }
    })

    useEffect(() => {
        if (variation) setInputs(variation)
    }, [variation])

    const addOptVariation = newOption => {
        setInputs({
            ...inputs,
            options: [
                ...inputs.options,
                newOption
            ]
        })
    }

    const editOptVariation = (option, index) => {
        const newState = { ...inputs };
        newState.options.splice(index, 1, option)
        setInputs(newState)
    }

    const deleteOptVariation = (id) => {
        setInputs({
            ...inputs,
            options: inputs.options
                .filter(opt => opt._id !== id)
        })
    }

    function onSubmit() {
        if (!inputs.options.length < 1) {
            return setErrors({
                ...errors,
                options: "options can't be empty"
            })
        }

        else post({
            variables: {
                variationInput: {
                    variationName: inputs.variationName,
                    options: inputs.options.map(opt => {
                        return {
                            ...opt,
                            __typename: undefined
                        }
                    })
                },
                variationId: variation._id
            }
        })
    }

    function handleModalClose() {
        setInputs(variation);
        toggleEditMode();
    }

    return (
        <>
            <span className="font-weight-bold text-light">
                {inputs.variationName}:
            </span>
            {inputs.options.map(opt => {
                return (
                    <span
                        key={opt.name}
                        className="text-light ml-1">
                        {opt.name}
                    </span>
                )
            })}
            <GroupButton>
                {!editMode ? <CustomButton
                    onClick={toggleEditMode}
                    btn_class="fas fa-edit btn-icon-text"
                ></CustomButton> :
                    <VariationForm
                        inputs={inputs}
                        handleSubmit={handleSubmit}
                        handleVariationName={handleChange}
                        editOptVariation={editOptVariation}
                        deleteOptVariation={deleteOptVariation}
                        addOptVariation={addOptVariation}
                        onModalClose={handleModalClose}
                        errors={errors}
                    />
                }

                <VariationDelete
                    variationId={inputs._id}
                    updateQuery={updateQuery} />
            </GroupButton>
        </>
    )

}

export default VariationUpdate
