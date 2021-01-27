import React from 'react'
import { Row, Col } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import ProfileHeader from './ProfileHeader';
import PageMenu from '../../layout/PageMenu';
import ReviewData from './profileReviews/ReviewsData';
import SectionWrapper from '../../layout/SectionWrapper';
import ItemData from './profileItems/ItemData';

const ProfileGrid = ({ resData, activeSection }) => {
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
                        {activeSection === "portfolio" && <ItemData />}
                        {activeSection === "gigs" && <ItemData />}
                    </SectionWrapper>
                </Col>
            </Row>
        </>
    )
}

export default ProfileGrid
