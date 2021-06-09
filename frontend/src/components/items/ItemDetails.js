import React from 'react'
import { Row, Col } from 'react-bootstrap'
import "./style.css"
import ThumbGallery from '../../layout/ThumbGallery'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'

const ItemDetails = ({ item }) => {
    return (
        <Row className="itemDetails w-100">
            <Col lg={8} className="itemDetails__col itemDetails-gallery">
                {item.gallery && <ThumbGallery
                    items={item.gallery}
                    img_class="itemImg" />}
            </Col>
            <Col lg={4} className="itemDetails__col itemDetails-content">
                <BoxWrapper>
                    <ListItem field="title" content={item.title} />
                    <ListItem field="description" content={item.description} maxWords="50" />
                    <ListItem field="service" content={item.service} />
                    <ListItem field="garment" content={item.garment} />
                    <ListItem field="category" content={item.category} />
                    <ListItem field="style" content={item.style} />
                    <ListItem field="occasion" content={item.occasion} />
                </BoxWrapper>
                {/* <ItemUpdate item={item} /> */}
            </Col>
        </Row>
    )
}

export default ItemDetails
