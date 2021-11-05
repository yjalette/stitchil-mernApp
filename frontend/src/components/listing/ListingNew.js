import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import CustomModal from '../../layout/CustomModal'
import { CREATE_LISTING_MUTATION } from './graphql/mutations'
import ProductCreate from '../product/ProductCreate'
import { useHistory } from 'react-router'
import { attributes } from '../../constants/attributes/attributes'


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


    const handleListingSave = (productId, productType) => {
        const listingAttributes = Object.keys(attributes[listingType][productType])
        console.log(productId, listingAttributes)
        createListing({
            variables: {
                productId,
                listingType,
                listingAttributes
            }
        })

    }

    return (
        <CustomModal
            modal_title={listingType === "make" ? "create a gig" : ""}
            modal_size="md"
            btn_class="btn-click"
            btn_title={listingType === "make" ? "create a gig" : ""}
        >
            <ProductCreate
                onCompleted={handleListingSave} />
        </CustomModal>
    )
}

export default ListingNew
