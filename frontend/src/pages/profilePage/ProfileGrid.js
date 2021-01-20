import React from 'react'
import { Row, Col } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import ProfileHeader from './ProfileHeader';
import PageMenu from '../../layout/PageMenu';
import ReviewData from './profileReviews/ReviewsData';
import PortfolioIndex from './profilePortfolio/PortfolioIndex';
import GigIndex from './profileGig/GigIndex';
import SectionWrapper from '../../layout/SectionWrapper';

const ProfileGrid = ({ resData, activeSection }) => {
    console.log(resData)
    return (
        <>
            <ProfileHeader profile={resData} />
            <Row className="profile__main p-3 w-100">
                <Col lg={5} className="profile__col profile-leftComlun">
                    <ProfileIntro profile={resData} />
                </Col>
                <Col lg={7} className="profile__col profile-rightComlun p-0">
                    <PageMenu items={["gigs", resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                    <SectionWrapper>
                        {activeSection === "reviews" && <ReviewData />}
                        {activeSection === "portfolio" && <PortfolioIndex section={activeSection} />}
                        {activeSection === "gigs" && <GigIndex section={activeSection} />}
                    </SectionWrapper>
                </Col>
            </Row>
        </>
    )
}

export default ProfileGrid
