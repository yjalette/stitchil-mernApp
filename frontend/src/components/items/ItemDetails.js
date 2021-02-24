import React from 'react'
import { Row, Col } from 'react-bootstrap'

import "./style.css"
import ThumbGallery from '../../layout/ThumbGallery'
import PictureZoom from '../pictures/PictureZoom'

const ItemDetails = ({ gallery, children }) => {
    return (
        <Row className="itemDetails w-100">
            <Col lg={8} className="itemDetails__col itemDetails-gallery">
                {!gallery ? <></> : gallery.length === 1 ? <PictureZoom elem_class="itemImg" imageUrl={gallery[0]} />
                    :
                    <ThumbGallery items={gallery} img_class="itemImg" />
                }
            </Col>
            <Col lg={4} className="itemDetails__col itemDetails-content">
                {children}
            </Col>
        </Row>
    )
}

export default ItemDetails
