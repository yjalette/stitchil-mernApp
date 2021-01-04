import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import './style.css';

import ProfilePageContext from '../../context/Profile-context';
import useGetData from '../../custom_hooks/useGetData';
import UserSum from '../../components/profileUser/UserSum';
import PageMenu from '../../components/navbar/PageMenu';
import ProfileSection from './ProfileSection';
import DesignerData from '../../components/profileDesigner/DesignerData';
import UserHeader from '../../components/profileUser/UserHeader';

const ProfileData = ({ logged_in_user, username, section }) => {
    const [resData, setResData] = useState({});
    const { data, getData } = useGetData("profileintro");

    useEffect(() => {
        if (username) getData({ variables: { username } });
    }, [username]);

    useEffect(() => {
        if (data) setResData(data.profile_intro)
    }, [data])

    console.log(resData)
    if (!data) return <div className="text-light bg-dark">loadddinnnggg</div>

    return (
        <ProfilePageContext.Provider value={{ logged_in_user }}>
            <section className="profile">
                <UserHeader profile={resData} />
                <Row className="profile__main">
                    <Col lg={5} className="profile__col profile-leftComlun">
                        <UserSum profile={resData} />
                        {data && data.profile_intro.portfolio && <DesignerData portfolioId={data.profile_intro.portfolio} />}
                    </Col>
                    <Col lg={7} className="profile__col profile-rightComlun p-0">
                        <PageMenu links={["gigs", resData.role === "designer" ? "portfolio" : null, "reviews"]} />
                        <ProfileSection section={section} />
                    </Col>
                </Row>
            </section>

        </ProfilePageContext.Provider>
    )

}

export default ProfileData;

