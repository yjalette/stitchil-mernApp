import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import CustomModal from '../../layout/CustomModal'
import { CREATE_LISTING_MUTATION } from './graphql/mutations'
import ProductCreate from '../product/ProductCreate'
import { useHistory } from 'react-router'


const ListingNew = ({ listingType }) => {
    const { push } = useHistory()
    const [createListing] = useMutation(CREATE_LISTING_MUTATION, {
        onCompleted: data => {
            if (data) {
                const listingId = data.createListing
                push(`/listing/draft/type-${listingType}/${listingId}/`)
            }
        }
    })

    const handleListingSave = (productId) => {
        createListing({
            variables: {
                listingType,
                productId
            }
        })

    }

    return (
        <CustomModal
            btn_class="btn-click"
            btn_title={listingType === "make" ?
                "create a gig" :
                ""}
        >

            <ProductCreate
                onCompleted={handleListingSave} />
        </CustomModal>
    )
}

export default ListingNew
