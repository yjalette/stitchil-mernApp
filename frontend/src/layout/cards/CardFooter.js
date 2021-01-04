import React from 'react';
import { Card } from 'react-bootstrap';


const CardFooter = ({ footer, children, card_class }) => {
    return (
        <Card.Footer className={`${card_class}__footer overlayCard__footer w-100`}>
            {footer}
            {children}
        </Card.Footer>
    )
}

export default CardFooter;