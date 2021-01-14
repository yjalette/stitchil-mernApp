import React from 'react'
import { Row, Col } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import ProfileHeader from './ProfileHeader';
import PageMenu from '../../layout/PageMenu';
import ReviewData from './profileReviews/ReviewsData';
import PortfolioIndex from './profilePortfolio/PortfolioIndex';
import GigIndex from './profileGig/GigIndex';

const ProfileGrid = ({ resData, activeSection }) => {
    console.log(resData)
    return (
        <section className="profile">
            <ProfileHeader profile={resData} />
            <Row className="profile__main">
                <Col lg={5} className="profile__col profile-leftComlun">
                    <ProfileIntro profile={resData} />
                </Col>
                <Col lg={7} className="profile__col profile-rightComlun p-0">
                    <PageMenu items={["gigs", resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                    <div className={`profileSection profilSection-${activeSection}`}>
                        {activeSection === "reviews" && <ReviewData />}
                        {activeSection === "portfolio" && <PortfolioIndex section={activeSection} />}
                        {activeSection === "gigs" && <GigIndex section={activeSection} />}
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default ProfileGrid
