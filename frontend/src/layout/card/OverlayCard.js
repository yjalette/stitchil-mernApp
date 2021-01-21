import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';

const OverlayCard = ({ card_props, onClick }) => console.log(card_props) || (
    <Card className={`overlayCard ${card_props.class}`} onClick={onClick}>
        {card_props.imageUrl && <Card.Img src={card_props.imageUrl} className="overlayCard__img" alt="card image" />}
        <Card.ImgOverlay className="overlayCard__container">
            <Card.Header className="overlayCard__header">
                <Card.Title className="overlayCard__title">{card_props.title}</Card.Title>
                {card_props.header}
            </Card.Header>
            <Card.Body>{card_props.body}</Card.Body>
            {card_props.footer && <Card.Footer>{card_props.footer}</Card.Footer>}
        </Card.ImgOverlay>
    </Card>
)


export default OverlayCard