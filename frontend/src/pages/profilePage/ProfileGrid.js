import React, { memo } from 'react'
import { Row, Col } from 'react-bootstrap';
import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';
import ProfileItems from './ProfileItems';
import ProfileReviews from './ProfileReviews';

export const ProfileGrid = memo(
    ({ resData, section }) => {
        return (
            <>
                <section className="profileHeader">
                    <ProfileHeader {...resData.intro} />
                </section>
                <Row className="profile__main m-0">
                    <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                        <ProfileIntro profile={resData.intro} />
                    </Col>
                    <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-rightComlun">
                        <SectionNav
                            currSection={section}
                            items={["gigs", resData.intro.role === "designer" && "portfolio", "reviews"]}
                        />
                        <BoxWrapper>
                            {section === "reviews" ? <ProfileReviews values={[]} />
                                : <ProfileItems values={resData[section]} />}
                        </BoxWrapper>
                    </Col>
                </Row>
            </>
        )
    }

)

