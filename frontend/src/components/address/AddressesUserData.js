import { useQuery } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'
import BoxWrapper from '../../layout/BoxWrapper';
import SectionWrapper from '../../layout/SectionWrapper';
import AddressCreate from './AddressCreate';
import AddressGrid from './AddressGrid';
import { ADDRESSES_USER_QUERY } from './graphql/queries'

const AddressesUserData = ({ addressButton, onlyLatest, getAddress }) => {
    const { data, updateQuery } = useQuery(ADDRESSES_USER_QUERY, {
        variables: { onlyLatest }
    });
    const [addresses, setAddresses] = useState([])

    useEffect(() => {
        if (data) {
            setAddresses(data.addressesUser)
            if (onlyLatest) getAddress(data.addressesUser[0])
        }
    }, [data])

    const handleCacheNewAddress = newAddress => {
        setAddresses([...addresses, newAddress])
        // updateQuery && updateQuery((prev, res) => {
        //     console.log(prev, res)
        //     return {
        //         addresses_user: [newAddress, ...prev.addresses_user]
        //     }
        // })


    }

    if (onlyLatest && addresses.length > 0) return (
        <BoxWrapper mod_class="address d-flex">
            <AddressGrid address={addresses[0]} />
            {/* {addressButton(addresses[0])} */}
        </BoxWrapper>
    )

    return (
        <>
            <SectionWrapper>
                {addresses.length > 0 ? addresses.map((address, i) => {
                    return (
                        <BoxWrapper mod_class="address d-flex" key={address.address1 + i}>
                            <AddressGrid label={i + 1} address={address} />
                            {addressButton(address)}
                        </BoxWrapper>
                    )
                }) : <h5>You Don't Have Any Addresses Saved</h5>}
            </SectionWrapper>
            <SectionWrapper>
                <BoxWrapper mod_class="address w-100">
                    <AddressCreate updateCache={handleCacheNewAddress} />
                </BoxWrapper>
            </SectionWrapper>
        </>
    )
}

export default AddressesUserData
