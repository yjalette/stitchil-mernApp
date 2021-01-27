import React from 'react'
import { Row, Col } from 'react-bootstrap'

import "./style.css"
import ItemGallery from './ItemGallery'

const ItemDetails = ({ gallery, children, imageUrl, coverImage }) => {
    return (
        <Row className="itemDetails">
            <Col lg={6} className="itemDetails__col itemDetails-gallery">
                <ItemGallery items={gallery || [imageUrl || coverImage]} />
            </Col>
            <Col lg={6} className="itemDetails__col itemDetails-content">
                {children}
            </Col>
        </Row>
    )
}

export default ItemDetails
