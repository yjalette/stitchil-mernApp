import React, { useContext } from 'react'
import ListingContext from '../../context/Listing-context'

const GigDraftFormWrapper = () => {
    const listing = useContext(ListingContext)
    console.log(listing)
    return (
        <div>

        </div>
    )
}

export default GigDraftFormWrapper
