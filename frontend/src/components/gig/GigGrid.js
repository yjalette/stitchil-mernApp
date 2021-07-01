import React from 'react'
import { Row, Col } from 'react-bootstrap';
import ListItem from '../../layout/ListItem';
import ThumbGallery from '../../layout/ThumbGallery';

const GigGrid = ({ item }) => {

    return (
        <Row className="gigGrid">
            <Col xl={6} className="gigGrid__gallery">
                {item && <ThumbGallery
                    items={item.gallery}
                />}
            </Col>
            <Col xl={6} className="gigGrid__description">
                {item && Object.keys(item).map(el => {
                    if (["_id", "gallery", "__typename", "coverImage", "active", "group"].includes(el)) return null
                    else return <ListItem key={el} field={el} content={item[el]} />
                })}
            </Col>
        </Row>
    )
}

export default GigGrid
