import React, { useState } from 'react'
import AddressesUserData from '../../components/address/AddressesUserData'
import { Form } from 'react-bootstrap';

const OrderAddress = ({ getAddressId, address_type }) => {
    const [address, setAddress] = useState(null)

    const handleAddress = (address) => {
        setAddress(address)
        getAddressId(`${address_type}Id`, address._id)
    }

    console.log(address)
    return (
        <>

            <AddressesUserData addressButton={(user_address) => {
                const value = address ? user_address._id === address._id : false
                return <Form.Check
                    type="radio"
                    name={user_address._id}
                    value={value}
                    checked={value}
                    onChange={() => handleAddress(user_address)} />

            }} />

            {/* <BoxWrapper key={ship_option.mailClass + i}>
                            <Form.Check
                                type="radio"
                                label={`${makeString(ship_option)}`}
                                name={ship_option._id}
                                value={ship_option._id === shippingId}
                                checked={ship_option._id === shippingId}
                                onChange={() => {
                                    getShippingId("shippingId", ship_option._id)
                                    toggle()
                                }}
                            />
                        </BoxWrapper> */}
            {/* {address ? <AddressGrid address={address} /> : <div></div>}
            <CustomModal
                modal_title="addresses"
                modal_size="lg"
                btn_class="btn-click"
                btn_title={address ? "change address" : "add address"}
                timeOut={address}
            >

            </CustomModal> */}
        </>
    )
}

export default OrderAddress
