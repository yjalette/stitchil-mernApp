import React from 'react';
import { Card } from 'react-bootstrap';

const CardBody = ({ body, children }) => {
    return (
        <Card.Body className="overlayCard__body" >
            {body}
            {children}

        </Card.Body>
    )
}

export default CardBody;