import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import CustomButton from '../../layout/button/CustomButton';
import { SWATCH_DELETE_MUTATION } from './graphql/mutations'

const SwatchDelete = ({ swatchId, removeFromState }) => {
    const [post] = useMutation(SWATCH_DELETE_MUTATION, {
        onCompleted: data => data && removeFromState(swatchId)
    });

    const handleDelete = () => {
        post({
            variables: {
                swatchId
            }
        })

    }
    return <CustomButton onClick={handleDelete} btn_class="btn-icon red" icon="fas fa-trash" />
}

export default SwatchDelete
