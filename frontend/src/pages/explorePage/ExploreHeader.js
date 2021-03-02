import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

const ExploreHeader = () => {
    return (
        <>
            <Row className="exploreHeader">
                <Col xl={7} lg={12} className="exploreHeader-content exploreHeader__col">
                    <h2 className="gradient-text exploreHeader__title">We Have Millions Of One-Of-A-Kind Designs</h2>
                    <span className="exploreHeader__subtitle subtitle">
                        We Have Millions Of One-Of-A-Kind Designs, So You Can Make Whatever You Want.
                </span>
                </Col>
                <Col xl={5} lg={12} className="exploreHeader__col">
                    <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105234/background/explore__heroimage_h5ocve.png" alt="header image" className="explore__heroimage" />
                </Col>
            </Row>
        </>
    )
}

export default ExploreHeader
