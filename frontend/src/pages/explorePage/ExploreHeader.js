import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const ExploreHeader = () => {
    const { pathname } = useLocation();
    return (
        <Row className="explore__header">
            <Col xl={7} lg={12} className="col-content">
                <h2 className="gradient-text explore__header-title">We Have Millions Of One-Of-A-Kind Designs</h2>
                <span className="explore__header-text subtitle">
                    We Have Millions Of One-Of-A-Kind Designs, So You Can Make Whatever You Want.
                </span>
                {/* {pathname.includes("gigs") && <SearchByKey />} */}
            </Col>
            <Col xl={5} lg={12} className="h-100">
                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105234/background/explore__heroimage_h5ocve.png" alt="header image" className="explore__heroimage" />
            </Col>
        </Row>

    )
}

export default ExploreHeader
