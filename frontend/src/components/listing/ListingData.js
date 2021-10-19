import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ListingContext from '../../context/Listing-context'
import { LISTING_QUERY } from './graphql/queries'

const ListingData = ({ children }) => {
    const { listingId } = useParams()
    const [state, setState] = useState({})
    const { data, updateQuery } = useQuery(LISTING_QUERY, {
        variables: { listingId },
        skip: !listingId
    });

    useEffect(() => {
        if (data) {
            return setState(data.listing)
        }

    }, [data])

    return (
        <ListingContext.Provider value={{ state, setState, updateQuery }}>
            {children}
        </ListingContext.Provider>
    )
}

export default ListingData
