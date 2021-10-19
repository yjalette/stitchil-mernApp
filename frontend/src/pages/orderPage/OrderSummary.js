import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import SectionWrapper from '../../layout/SectionWrapper'

const OrderSummary = ({ item, pack, fabric, shipping }) => {

    return (
        <Row className="align-items-center">
            <Col lg={3} sm={12}>
                <Image src={item && item.gallery[0]} className="orderSummary__img" />
            </Col>
            <Col lg={9} sm={12}>
                <BoxWrapper mod_class="orderSummary">
                    <SectionWrapper>
                        <ListItem
                            field="buyer"
                            content={shipping.shippingCarrier}
                        />
                        <ListItem
                            field="seller"
                            content={shipping.mailClass}
                        />
                    </SectionWrapper>
                    <SectionWrapper>
                        <ListItem field="title" content={item.title} />
                        <ListItem field="description" content={item.description} maxWords="50" />
                        <ListItem field="service" content={item.service} />
                    </SectionWrapper>
                    <SectionWrapper>
                        <ListItem
                            field="pack type"
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

                    </SectionWrapper>
                    <SectionWrapper>
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

                    </SectionWrapper>
                </BoxWrapper>
            </Col>
        </Row>
    )
}

export default OrderSummary
