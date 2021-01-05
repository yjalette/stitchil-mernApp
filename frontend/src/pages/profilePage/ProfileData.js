import React, { useEffect, useState } from 'react';

import './style.css';

import ProfilePageContext from '../../context/Profile-context';
import useGetData from '../../custom_hooks/useGetData';
import ProfileGrid from './ProfileGrid';

const ProfileData = ({ logged_in_user, username, activeSection }) => {
    const [resData, setResData] = useState({});
    const { data, getData } = useGetData("profileintro");

    useEffect(() => {
        if (username) getData({ variables: { username } });
    }, [username]);

    useEffect(() => {
        if (data) setResData(data.profile_intro)
    }, [data])


    if (!data) return <div className="text-light bg-dark">loadddinnnggg</div>

    console.log(username)
    return (
        <ProfilePageContext.Provider value={{ logged_in_user }}>
            <ProfileGrid resData={resData} activeSection={activeSection} />
        </ProfilePageContext.Provider>
    )

}

export default ProfileData;

