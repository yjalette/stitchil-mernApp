import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import CustomButton from '../../layout/button/CustomButton';
import { SHIPPING_DELETE_MUTATION } from './graphql/mutations'

const ShippingDelete = ({ shippingId, updateQuery }) => {
    const [post] = useMutation(SHIPPING_DELETE_MUTATION, {
        onCompleted: data => {
            if (data) {
                updateQuery(({ listing }) => {
                    const shipping_options = listing.shipping_options
                        .filter(ship => ship._id !== shippingId);
                    return {
                        listing: {
                            ...listing,
                            shipping_options
                        }
                    }
                })
            }
        }
    });

    const handleDelete = () => {
        post({
            variables: { shippingId }
        })
    }

    return (
        <CustomButton
            btn_class="btn-icon-text fas fa-trash red"
            onClick={handleDelete}
        />
    )
}

export default ShippingDelete
