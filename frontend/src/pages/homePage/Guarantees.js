import React from 'react';
import { Row, Col, Image, Card } from 'react-bootstrap';


const Guarantees = ({ content }) => {
    return (
        <Row className="section-wrapper guarantees">
            <Col sm={12} md={6} className="guarantees__col flex-center">
                <h4 className="text-center gradient-text ">We Use Best-In-Class Technology To Protect Your Transactions.</h4>
                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105343/homepage/credit-card_bn2nif.svg" alt="phone gif" className="guarantees__illustration w-75 p-2" />
            </Col>
            <Col sm={12} md={6} className="guarantees__col flex-center ">
                {content.map(guaranty => (
                    <Card className="guarantees__card" key={guaranty.title}>
                        <Card.Img src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105343/homepage/price-tag_n0fhaa.svg" className="guarantees__img p-2" alt="guarantees img" />
                        <Card.ImgOverlay className="flex-center justify-content-end w-75">
                            <Card.Title as="h5" className="guarantees__title">{guaranty.title}<span className="fa fa-check text-light ml-1"></span></Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                ))}

            </Col>


        </Row >
    )
}

export default Guarantees;