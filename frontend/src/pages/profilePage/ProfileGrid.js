import React from 'react'
import { Row, Col } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';
import SectionHeader from '../../layout/SectionHeader';
import ProfileSection from './ProfileSection';

const ProfileGrid = ({ resData, sectionProps, section }) => (
    <>
        <section className="profileHeader">
            <ProfileHeader {...resData.intro} />
        </section>
        <Row className="profile__main m-0">
            <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                <ProfileIntro profile={resData.intro} />
            </Col>
            <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-rightComlun">
                <SectionNav currSection={section} items={["gigs", resData.intro.role === "designer" && "portfolio", "reviews"]} />
                <BoxWrapper>
                    <SectionHeader title={`${section} (${resData[section] ? resData[section].length : 0})`} />
                    <ProfileSection values={resData[section]} {...sectionProps} />
                </BoxWrapper>
            </Col>
        </Row>
    </>
)

export default ProfileGrid
