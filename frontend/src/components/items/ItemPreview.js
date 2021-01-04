import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

import UserAvatar from '../../layout/media/UserAvatar';
import CustomModal from '../../layout/CustomModal';

const ItemPreview = ({ item, children }) => {
    const { section } = useParams();

    const header = item.creator && <UserAvatar username={item.creator.username} profileImage={item.creator.profileImage} />;

    if (!item.creator) return <div>loaddding</div>
    return (
        <CustomModal
            modal_class="item-preview__wrapper flex-center" modal_header={header} btn_title="preview" btn_class="custom-btn item-preview_btn">
            <Row className="item-preview-modal">
                <Col md={6} className="item__img-wrapper">
                    <Image src={item.url || item.coverImage || item.gallery[0].coverImage} className="item__img" alt="item image" />
                </Col>
                <Col md={6}>
                    {children}
                    <button className="custom-btn" > <Link to={`/profile/${item.creator.username}/${section}/`}>more details </Link></button>
                </Col>
            </Row>
        </CustomModal>
    )
}

export default ItemPreview
