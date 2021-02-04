import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import ProfileIntro from './ProfileIntro';
import PageMenu from '../../layout/PageMenu';
import BoxWrapper from '../../layout/BoxWrapper';
import ProfileImage from './ProfileImage';
import GroupButton from '../../layout/button/GroupButton';
import CustomButton from '../../layout/button/CustomButton';
import ItemGrid from './profileItems/ItemGrid';

const ProfileGrid = ({ resData, sectionProps }) => {
    return (
        <>
            <ProfileImage src={resData && resData.coverImage} image_type="coverImage" />
            <Container className="profileHeader">
                <Container className="profileHeader__content">
                    <ProfileImage src={resData && resData.profileImage} image_type="profileImage" />
                    <h2 className="profileHeader__title">{resData.fullname} </h2>
                </Container>
                <GroupButton>
                    <CustomButton btn_class="btn-click">message</CustomButton>
                    <CustomButton btn_class="ml-2 btn-click">follow</CustomButton>
                </GroupButton>
            </Container>
            <Row className="profile__main p-3 w-100">
                <Col xl={4} lg={5} sm={12} className="profile__col profile-leftComlun">
                    <ProfileIntro profile={resData} />
                </Col>
                <Col xl={8} lg={7} sm={12} className="profile__col profile-rightComlun p-0">
                    <PageMenu items={["gigs", resData && resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                    <BoxWrapper>
                        <ItemGrid {...sectionProps} />
                    </BoxWrapper>
                </Col>
            </Row>
        </>
    )
}

export default ProfileGrid
