import React from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import ShippingCreate from './ShippingCreate'
import ShippingUpdate from './ShippingUpdate'
import "./style.css"

const ShippingGrid = ({ shipping_options, updateQuery }) => {
    return (
        <div>
            {shipping_options && shipping_options.length > 0 && shipping_options.map((opt, index) => {
                return (
                    <BoxWrapper key={index} mod_class="shipping" >
                        <ListItem field={`${opt.mailClass}`} content={`$${opt.shippingPrice}`} />
                        <ShippingUpdate shipping={opt} updateQuery={updateQuery} />
                    </BoxWrapper>
                )
            })}
            <BoxWrapper mod_class="shipping new" >
                <ShippingCreate updateQuery={updateQuery} />
            </BoxWrapper>
        </div>
    )
}

export default ShippingGrid
