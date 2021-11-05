import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';

const OverlayCard = ({ card_props, onClick }) => console.log(card_props) || (
    <Card className={`overlayCard ${card_props.class}`} onClick={onClick}>
        <Card.Header className="overlayCard__header">
            <button className="overlayCard__btn" onClick={onClick} name={card_props.title}>
                <Card.Title className="overlayCard__title">{card_props.title}</Card.Title>
            </button>
            {card_props.header}
        </Card.Header>
        {card_props.url && <Card.Img src={card_props.url} className="overlayCard__img" alt="card image" />}
        {card_props.footer && <Card.Footer>{card_props.footer}</Card.Footer>}
        <Card.Body>{card_props.body}</Card.Body>
    </Card>
)




export default OverlayCard;


