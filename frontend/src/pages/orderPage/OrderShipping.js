import React from 'react'
import { useToggle } from '../../custom_hooks/useToggle'
import CustomButton from '../../layout/button/CustomButton'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'

const OrderShipping = ({ shipping_options, shippingId, getShippingId }) => {
    const [open, toggle] = useToggle(false);

    if (!shipping_options || !shippingId) return null;

    return (
        <>
            <SectionWrapper>
                {shipping_options.map((ship_option, i) => {
                    return (
                        <BoxWrapper key={ship_option.mailClass + i} mod_class="orderShipping">
                            <CustomButton
                                btn_class={`btn-click ${ship_option._id === shippingId && "selected"} `}
                                onClick={() => {
                                    getShippingId("shippingId", ship_option._id)
                                    toggle()
                                }}
                            >
                                {`${makeString(ship_option)}`}
                            </CustomButton>
                        </BoxWrapper>
                    )
                })}
            </SectionWrapper>
        </>

    )
}

function makeString({ shippingCarrier, mailClass, shippingPrice }) {
    return `${shippingCarrier} ${mailClass} $${shippingPrice}`
}


export default OrderShipping
