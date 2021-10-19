import React from 'react'
import { Container, Image } from 'react-bootstrap'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import UserAvatar from '../user/UserAvatar'
import "./style.css"

const OrderSummary = ({ item, package: pack, fabric, shipping }) => {
    return (
        <BoxWrapper mod_class="orderSummary">
            <div>
                <Image src={item && item.gallery[0]} className="orderSummary__img" />
            </div>
            <div>
                <Container>
                    <h6>Item</h6>
                    <ListItem
                        field="title"
                        content={item.title} />
                    <ListItem
                        field="description"
                        content={item.description} />
                    <ListItem
                        field="service"
                        content={item.service} />
                </Container>
                <Container>
                    <h6>Package</h6>
                    <ListItem
                        field="package type"
                        content={`${pack.type}`} />
                    <ListItem
                        field="price(USD)"
                        content={`$${pack.price}`} />
                    <ListItem
                        field="delivery"
                        content={`${pack.delivery} days`} />
                    <ListItem
                        field="fabric"
                        content={fabric.name} />
                </Container>
                <Container>
                    <h6>Shipping</h6>
                    <ListItem
                        field="shipping carrier"
                        content={shipping.shippingCarrier}
                    />
                    <ListItem
                        field="mail class"
                        content={shipping.mailClass}
                    />
                    <ListItem
                        field="shipping cost(USD)"
                        content={`$${shipping.shippingPrice}`}
                    />
                </Container>

            </div>
        </BoxWrapper>
    )
}

export default OrderSummary
