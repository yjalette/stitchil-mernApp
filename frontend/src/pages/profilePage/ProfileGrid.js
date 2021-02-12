import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';

import ItemGrid from './profileItems/ItemGrid';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';

const ProfileGrid = ({ resData, sectionProps, section }) => {
    return (
        <>
            <ProfileHeader coverImage={resData && resData.coverImage} profileImage={resData && resData.profileImage} fullname={resData && resData.fullname} />
            <Row className="profile__main w-100">
                <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                    <ProfileIntro profile={resData} />
                </Col>
                <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-rightComlun p-0">
                    <SectionNav currSection={section} items={["gigs", resData && resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                    <BoxWrapper>
                        <ItemGrid {...sectionProps} />
                    </BoxWrapper>
                </Col>
            </Row>
        </>
    )
}

export default ProfileGrid
