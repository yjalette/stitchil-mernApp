import React from 'react';
import { Card } from 'react-bootstrap';

const ExploreCard = ({ item, onClick }) => {
    return (
        <Card className="explore__card">
            <Card.ImgOverlay>
                <Card.Title as="h5" className="explore__card-header" >
                    {item.title}
                    <i className="fa fa-angle-double-right customIcon ml-3" onClick={() => onClick(item.title)} />
                </Card.Title>
            </Card.ImgOverlay>
            <Card.Img src={item.url} className="explore__card-img" alt="item image" />
        </Card>
    )
}

export default ExploreCard
