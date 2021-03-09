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
            <ProfileHeader
                country={resData && resData.country}
                coverImage={resData && resData.coverImage}
                profileImage={resData && resData.profileImage}
                fullname={resData && resData.fullname} />
        </section>
        <Row className="profile__main w-100 m-0">
            <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                <ProfileIntro profile={resData} />
            </Col>
            <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-section">
                <SectionNav currSection={section} items={["gigs", resData && resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                <BoxWrapper box_class="h-100">
                    <SectionHeader title={`${section} (${resData && resData[section] ? resData[section].length : 0})`}> </SectionHeader>
                    <ProfileSection values={resData[section]} {...sectionProps} />
                </BoxWrapper>
            </Col>
        </Row>
    </>
)

export default ProfileGrid
