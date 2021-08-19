import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import SectionWrapper from '../../layout/SectionWrapper'

const OrderSummary = ({ order_item, order_package, order_fabric, order_shipping }) => {

    return (
        <Row className="align-items-center">
            <Col lg={3} sm={12}>
                <Image src={order_item && order_item.gallery[0]} className="orderSummary__img" />
            </Col>
            <Col lg={9} sm={12}>
                <BoxWrapper mod_class="orderSummary">
                    <SectionWrapper>
                        <ListItem field="title" content={order_item.title} />
                        <ListItem field="description" content={order_item.description} maxWords="50" />
                        <ListItem field="service" content={order_item.service} />
                    </SectionWrapper>
                    <SectionWrapper>
                        <ListItem
                            field="package type"
                            content={`${order_package.type}`} />
                        <ListItem
                            field="price(USD)"
                            content={`$${order_package.price}`} />
                        <ListItem
                            field="delivery"
                            content={`${order_package.delivery} days`} />
                        <ListItem
                            field="fabric"
                            content={order_fabric.name} />

                    </SectionWrapper>
                    <SectionWrapper>
                        <ListItem
                            field="shipping carrier"
                            content={order_shipping.shippingCarrier}
                        />
                        <ListItem
                            field="mail class"
                            content={order_shipping.mailClass}
                        />
                        <ListItem
                            field="shipping cost(USD)"
                            content={`$${order_shipping.shippingPrice}`}
                        />

                    </SectionWrapper>
                </BoxWrapper>
            </Col>
        </Row>
    )
}

export default OrderSummary
