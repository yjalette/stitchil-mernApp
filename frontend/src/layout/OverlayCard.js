import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';

const OverlayCard = ({ coverImage, title, card_class, children, onClick }) => (
    <Card className={`overlayCard overlayCard-${card_class}`} onClick={onClick}>
        {coverImage && <Card.Img src={coverImage} className="overlayCard__img" alt="card image" />}
        <Card.ImgOverlay className="overlayCard__body">
            <Card.Header className="overlayCard__header">
                <Card.Title className="overlayCard__title">{title}</Card.Title>
            </Card.Header>
            {children}
        </Card.ImgOverlay>
    </Card>
)

export default OverlayCard
