import { useMutation } from '@apollo/react-hooks';
import React, { useContext } from 'react'
import { useParams } from 'react-router';
import ListingContext from '../../context/Listing-context'
import CustomButton from '../../layout/button/CustomButton';
import { PUBLISH_LISTING_MUTATION } from './graphql/mutations';

const msg_published = "your listing is active"
const msg_unpublished = "your listing is a draft"

const ListingPublish = () => {
    const { state } = useContext(ListingContext);
    const { listingId } = useParams()
    const [post] = useMutation(PUBLISH_LISTING_MUTATION)
    const publish = () => {
        post({
            variables: {
                listingId: state._id
            }
        })
    }

    return (
        <div>
            <h6>{!state.active ? msg_unpublished : msg_published}</h6>
            <CustomButton
                onClick={publish}
                btn_class="btn-click"
            >
                {!state.active ? "publish" : "unpublish"} listing
            </CustomButton>
        </div>
    )
}



export default ListingPublish
