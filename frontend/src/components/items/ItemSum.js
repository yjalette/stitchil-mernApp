import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';

import "./style.css"
import OverlayCard from '../../layout/cards/OverlayCard';

const ItemSum = ({ item_title, item_highlights, item_img, item_footer }) => {
    return (
        <OverlayCard
            coverImage={item_img}
            title={item_title}
            card_class="item itemSum"
        >
            <Card.Body className="itemSum__body">
                {item_highlights}
            </Card.Body>
            <Card.Footer card_class="itemSum__footer flex-center flex-column justify-content-between w-100">
                {item_footer}
            </Card.Footer>
        </OverlayCard>
    )
}

export default ItemSum;
