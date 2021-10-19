import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import CustomButton from '../../layout/button/CustomButton';
import { DELETE_VARIATION_MUTATION } from './graphql/mutations'

const VariationDelete = ({ variationId, updateQuery }) => {
    const [post] = useMutation(DELETE_VARIATION_MUTATION, {
        onCompleted: data => {
            if (data) {
                updateQuery(prev => {
                    return {
                        listing: {
                            ...prev.listing,
                            variations: prev.listing.variations.filter(v => v._id !== variationId)
                        }
                    }
                })
            }
        }
    });

    const handleDelete = () => {
        post({
            variables: { variationId }
        })
    }

    return (
        <CustomButton
            btn_class="btn-icon-text fas fa-trash red"
            onClick={handleDelete}
        />
    )
}

export default VariationDelete
