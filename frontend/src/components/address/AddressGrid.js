import React from 'react'
import ListItem from '../../layout/ListItem'

const AddressGrid = ({ address, label }) => {
    const { address1, address2, city, state, zip } = address;
    return <ListItem
        field={label || ""}
        content={address1 + address2 + " " + city + " " + state + " " + zip} />
}

export default AddressGrid
