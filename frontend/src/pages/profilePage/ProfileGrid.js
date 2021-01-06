import React from 'react'
import { Row, Col } from 'react-bootstrap';

import ItemIndex from '../../components/profileItems/ItemIndex';
import ReviewIndex from '../../components/profileReviews/ReviewIndex';
import ProfileIntro from './ProfileIntro';
import ProfileHeader from './ProfileHeader';
import PageMenu from '../../layout/PageMenu';

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
                        {activeSection === "reviews" && <ReviewIndex />}
                        {activeSection === "portfolio" && <ItemIndex section={activeSection} />}
                        {activeSection === "gigs" && <ItemIndex section={activeSection} />}
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default ProfileGrid
