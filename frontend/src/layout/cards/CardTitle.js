import React from 'react';
import { Card } from 'react-bootstrap';

const CardTitle = ({ title, card_class }) => <Card.Title className={`${card_class}__title overlayCard__title`}>{title}</Card.Title>

export default CardTitle
