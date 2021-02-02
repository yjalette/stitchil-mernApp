import React from 'react'
import { Card, Container } from 'react-bootstrap'
import ListItem from '../../layout/ListItem';

const ItemSum = ({ header, highlights, coverImage, sideMenu }) => {
    return (
        <Card className="itemSum">
            <Card.Header>
                <Card.Title className="itemSum__title" >{header.title}</Card.Title>
                {header.other}
            </Card.Header>
            <Card.Body className="itemSum__body" >
                <Card.Img className="itemSum__img" src={coverImage} />
                <Container className="itemSum__overlay">
                    <div className="itemSum__menu">
                        {sideMenu}
                    </div>
                </Container>
            </Card.Body>
            <Card.Footer className="itemSum__footer" >{highlights.map((item, index) => <ListItem key={index} {...item} />)}</Card.Footer>
        </Card>
    )
}

export default ItemSum
