import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'

import ProfileItemContext from '../../context/ProfileItem-context';
import ImageZoom from '../../layout/media/ImageZoom';

const ItemDetails = ({ item, onForward, onBackward }) => {
    const { comp } = useContext(ProfileItemContext);
    return (
        <Row className="slides__item itemDetails">
            <Col lg={8} className="slides__col itemDetails__media">
                <ImageZoom img_class="slides__img" img_src={item.imageUrl} />
                <div className="slides__controls">
                    <i className="fa fa-angle-left " onClick={onBackward}></i>
                    <i className="fa fa-angle-right " onClick={onForward}></i>
                </div>
            </Col>
            <Col lg={4} className="slides__col">
                {comp.ItemDetailsComp(item)}
            </Col>
        </Row>
    )
}



export default ItemDetails
