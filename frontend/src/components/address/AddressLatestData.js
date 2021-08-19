import { useQuery } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'
import AddressGrid from './AddressGrid';
import { ADDRESS_LATEST_QUERY } from './graphql/queries'

const AddressLatestData = ({ addressButton, setDefaultAddress }) => {
    const { data } = useQuery(ADDRESS_LATEST_QUERY);
    const [address, setAddress] = useState(null)

    useEffect(() => {
        if (data) {
            setAddress(data.addressLatest)
            // setDefaultAddress(data.addressLatest)
        }
    }, [data])

    if (!data) return null

    return () => setDefaultAddress(data.addressLatest)
}

export default AddressLatestData
