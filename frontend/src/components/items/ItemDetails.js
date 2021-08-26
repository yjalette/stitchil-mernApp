import React from 'react'
import { Row, Col } from 'react-bootstrap'
import "./style.css"
import ThumbGallery from '../../layout/ThumbGallery'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'

const ItemDetails = ({ item, children }) => {
    return (
        <BoxWrapper>
            <Row className="itemDetails">
                <Col lg={6} className="itemDetails__col itemDetails-gallery">
                    {item.gallery && <ThumbGallery
                        items={item.gallery}
                        img_class="itemImg" />}
                </Col>
                <Col lg={6} className="itemDetails__col itemDetails-content">
                    <ListItem field="title" content={item.title} />
                    <ListItem field="description" content={item.description} maxWords="50" />
                    <ListItem field="service" content={item.service} />
                    <ListItem field="garment" content={item.garment} />
                    <ListItem field="category" content={item.category} />
                    <ListItem field="style" content={item.style} />
                    <ListItem field="occasion" content={item.occasion} />
                    {children}
                </Col>
            </Row>
        </BoxWrapper>
    )
}

export default ItemDetails
