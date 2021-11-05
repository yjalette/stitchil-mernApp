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
        const { state } = useContext(ProfileContext);
        console.log(state)
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
                        {/* <SectionNav
                            currSection={section}
                            items={["gigs", state.intro.role === "designer" && "portfolio", "reviews"]}
                        /> */}
                        <BoxWrapper>
                            <ProfileItems values={state.listings} />
                        </BoxWrapper>
                    </Col>
                </Row>
            </>
        )
    }

)

