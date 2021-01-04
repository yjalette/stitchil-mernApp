import React from 'react';
import { Card } from 'react-bootstrap';


const CardHeader = ({ children }) => {
    return (
        <Card.Header className="overlayCard__header">
            {children}
        </Card.Header>
    )
}

export default CardHeader
