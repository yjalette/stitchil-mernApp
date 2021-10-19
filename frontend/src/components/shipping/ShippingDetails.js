import React from 'react'
import { useToggle } from '../../custom_hooks/useToggle'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomButton from '../../layout/button/CustomButton'
import ListItem from '../../layout/ListItem'

const ShippingDetails = ({ shipping, options }) => {
    const [open, toggle] = useToggle(false)

    if (!shipping) return null
    return (
        <>
            <BoxWrapper mod_class="shippingDetails flex-center">
                <ListItem
                    field="shipping"
                    icon="fas fa-shipping-fast"
                    content={`${shipping.shippingCarrier} ${shipping.mailClass} +$${shipping.shippingPrice}`} />
                {options && <CustomButton
                    onClick={() => toggle()}
                    btn_class="btn-icon-plain fas fa-edit"
                    btn_otherProps={{
                        title: "change shipping"
                    }}
                />}
            </BoxWrapper>
            {open && options}
        </>

    )
}

export default ShippingDetails
