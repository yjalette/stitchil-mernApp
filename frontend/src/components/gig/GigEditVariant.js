import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import useForm from '../../custom_hooks/useForm'
import { GIG_UPDATE_VARIANT_MUTATION } from './graphql/mutations'
import GigFormVariant from './GigFormVariant'
import CustomButton from '../../layout/button/CustomButton'

const initState = { fabric: [], color: [], price: 0, delivery: 0 }

const GigEditVariant = ({ variant, index, updateCacheVariant }) => {
    const { itemId } = useParams()
    const {
        inputs,
        setInputs,
        handleChange,
        handleMultiChange,
        handleSubmit,
        editMode,
        setEditMode } = useForm(initState, onSubmit);

    const [post] = useMutation(GIG_UPDATE_VARIANT_MUTATION, {
        onCompleted: async data => {
            await updateCacheVariant(inputs, index)
            setEditMode(false)
        }
    });

    useEffect(() => {
        if (variant) setInputs(variant)
    }, [variant])

    function onSubmit() {
        if (inputs.price) inputs.price = parseInt(inputs.price)
        if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery)
        post({
            variables: {
                variantInput: {
                    ...inputs,
                    _id: variant._id,
                    __typename: undefined
                },
                itemId
            }
        })
    }

    console.log(variant)

    // if (!editMode) return (
    //     <div className="gigVariant">
    //         {Object.keys(inputs).map((label, i) => {
    //             if (["_id", "__typename"].includes(label)) return null
    //             if (!inputs[label] || inputs[label].length < 1) return null
    //             return <ListItem key={i} field={label} content={inputs[label]} />
    //         })}
    //         <CustomButton
    //             onClick={() => setEditMode(true)}
    //             btn_class="btn-icon"
    //             icon="fas fa-edit float-right" />
    //     </div>
    // )

    if (!editMode) return <CustomButton
        onClick={() => setEditMode(true)}
        btn_class="btn-icon-text"
        icon="fas fa-edit float-right">edit</CustomButton>

    return <GigFormVariant
        inputs={inputs}
        onChange={handleChange}
        onMultiChange={handleMultiChange}
        onSubmit={handleSubmit}
    />
}

export default GigEditVariant
