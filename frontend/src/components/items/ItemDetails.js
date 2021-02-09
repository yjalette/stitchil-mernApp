import React from 'react'
import { Row, Col } from 'react-bootstrap'

import "./style.css"
import ThumbGallery from '../../layout/ThumbGallery'

const ItemDetails = ({ gallery, children }) => {
    return (
        <Row className="itemDetails w-100">
            <Col lg={8} className="itemDetails__col itemDetails-gallery">
                <ThumbGallery items={gallery} />
            </Col>
            <Col lg={4} className="itemDetails__col itemDetails-content">
                {children}
            </Col>
        </Row>
    )
}

export default ItemDetails
