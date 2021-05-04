import React, { memo, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import ProfileContext from '../../context/Profile-context';
import ProfileIntro from './ProfileIntro';
import BoxWrapper from '../../layout/BoxWrapper';
import SectionNav from '../../components/navbar/SectionNav';
import ProfileHeader from './ProfileHeader';
import SectionHeader from '../../layout/SectionHeader';
import ProfileSection from './ProfileSection';
import ItemOverviewCreate from '../../components/items/ItemOverviewCreate';
import CustomPopover from '../../layout/CustomPopover';
import CustomButton from '../../layout/button/CustomButton';

export const ProfileGrid = memo(
    ({ resData, section, ...sectionProps }) => {
        const { logged_in_user } = useContext(ProfileContext);
        return (
            (
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
                                <SectionHeader title={`${section} (${resData[section] ? resData[section].length : 0})`} >
                                    {logged_in_user
                                        && section !== "reviews"
                                        && resData[section]
                                        && resData[section].length > 20 ?
                                        <CustomPopover
                                            content="max 6 items"
                                            trigger="click"
                                            placement="left-end"
                                            popover_class="warning">
                                            <CustomButton
                                                btn_class="btn-icon-text profileCreate-btn"
                                                icon="fas fa-plus" />
                                        </CustomPopover>
                                        :
                                        <ItemOverviewCreate />}
                                </SectionHeader>
                                <ProfileSection values={resData[section]} {...sectionProps} />
                            </BoxWrapper>
                        </Col>
                    </Row>
                </>
            )
        )
    }

)

