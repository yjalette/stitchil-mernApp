import React from 'react';
import { Container } from 'react-bootstrap';
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';

const ItemMap = ({ items, displayItem }) => {
    if (!items || items.length < 1) return <EmptyResultAlert type="gigs" />

    return (
        <Container className="item__list grid-container">
            {items.length > 0 && items.map((item, index) => <div key={index} className="item__wrapper"> {displayItem(item, index)}</div>)}
        </Container>
    )
}

export default ItemMap
