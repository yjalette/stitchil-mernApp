import React from 'react'
import { Container } from 'react-bootstrap'
import SectionWrapper from '../../layout/SectionWrapper'
import OrderShipping from './OrderShipping'

import OrderAddress from './OrderAddress'
import CustomForm from '../../layout/CustomForm'
import SectionHeader from '../../layout/SectionHeader'
import BoxWrapper from '../../layout/BoxWrapper'
import OrderSummary from '../../components/order/OrderSummary'

const OrderForm = ({ inputs, handleChange, onSubmit, errors, item, shipping_options, packages, msg }) => {
    const { fabricId, shippingId, packageId } = inputs
    const orderPackage = packageId && packages.find(pack => pack._id === packageId);
    const orderShipping = shippingId && shipping_options.find(opt => shippingId === opt._id);
    const items = [
        {
            title: "1. shipping address",
            body: <OrderAddress
                address_type="shippingAddress"
                getAddressId={handleChange} />
        },
        {
            title: "2. shipping method",
            body: <OrderShipping
                shippingId={shippingId}
                getShippingId={handleChange}
                shipping_options={shipping_options}
            />
        },
        {
            title: "3. summary",
            body: orderPackage && orderShipping
                && <OrderSummary
                    item={item}
                    package={orderPackage}
                    shipping={orderShipping}
                    fabric={orderPackage.fabrics.find(fab => fab._id === fabricId)}
                />

        }
    ]
    return (
        <>
            {items && items.map((item, i) => {
                return (
                    <SectionWrapper key={item.title + i} mod_class="orderForm">
                        <BoxWrapper mod_class="orderForm w-100">
                            <SectionHeader title={item.title} />
                            {item.body}
                        </BoxWrapper>
                    </SectionWrapper>
                )
            })}
            {inputs.packageId &&
                <SectionWrapper mod_class="orderForm">
                    <Container className="p-5 flex-center">
                        <CustomForm
                            form_error={errors.form_error}
                            form_msg={msg}
                            onSubmit={onSubmit}
                            submitTitle="place"
                        >
                            <Container className="orderForm__total flex-center">
                                <h4>package ${orderPackage.price}</h4>
                                <h4>+</h4>
                                <h4>shipping ${orderShipping.shippingPrice}</h4>
                                <h4>=</h4>
                                <h4>order total ${orderPackage.price + orderShipping.shippingPrice}</h4>
                            </Container>
                        </CustomForm>
                    </Container>
                </SectionWrapper>}

        </>
    )
}


export default OrderForm
