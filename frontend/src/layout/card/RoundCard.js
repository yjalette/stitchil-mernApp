import React from 'react';
import { Card, Image } from 'react-bootstrap';
import "./style.css"

const RoundCard = ({ item }) => (
    <Card className="roundCard-active roundCard flex-center flex-column">
        <div className="roundCard__body roundCard--front">
            <Image src={item.image} alt="card image" className="card-img roundCard__img" />
            <Card.Title as="h4" className="roundCard__title">{item.title}</Card.Title>
        </div>
        <div className="roundCard__body roundCard--back">
            <Card.Title as="h4" className="roundCard__title">{item.title}</Card.Title>
            <Card.Text className=" roundCard__text">{item.text.split("").slice(0, 120)}</Card.Text>
        </div>

    </Card>
)

export default RoundCard;