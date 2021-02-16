import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';

import ItemGrid from './profileItems/ItemGrid';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';
import SectionHeader from '../../layout/SectionHeader';

const ProfileGrid = ({ resData, sectionProps, section }) => {
    return (
        <>
            <section className="profileHeader">
                <ProfileHeader
                    country={resData && resData.country}
                    coverImage={resData && resData.coverImage}
                    profileImage={resData && resData.profileImage}
                    fullname={resData && resData.fullname} />
            </section>
            <Row className="profile__main w-100">
                <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                    <ProfileIntro profile={resData} />
                </Col>
                <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-section">
                    <SectionNav currSection={section} items={["gigs", resData && resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                    <SectionHeader title={`${section} (${resData && resData[section] ? resData[section].length : 0})`}> </SectionHeader>
                    <BoxWrapper>
                        <ItemGrid {...sectionProps} />
                    </BoxWrapper>
                </Col>
            </Row>
        </>
    )
}

export default ProfileGrid
