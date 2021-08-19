import React, { memo, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';
import ProfileItems from './ProfileItems';
import ProfileReviews from './ProfileReviews';
import ProfileContext from '../../context/Profile-context';

export const ProfileGrid = memo(
    () => {
        const { state, section } = useContext(ProfileContext);
        return (
            <>
                <section className="profileHeader">
                    <ProfileHeader />
                </section>
                <Row className="profile__main m-0">
                    <Col xl={4} lg={5} md={6} sm={12} className="profile__col profile-leftComlun">
                        <ProfileIntro />
                    </Col>
                    <Col xl={8} lg={7} md={6} sm={12} className="profile__col profile-rightComlun">
                        <SectionNav
                            currSection={section}
                            items={["gigs", state.intro.role === "designer" && "portfolio", "reviews"]}
                        />
                        <BoxWrapper>
                            {section === "reviews" ? <ProfileReviews values={[]} />
                                : <ProfileItems values={state[section]} />}
                        </BoxWrapper>
                    </Col>
                </Row>
            </>
        )
    }

)

