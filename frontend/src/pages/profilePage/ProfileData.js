import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { ProfileGrid } from './ProfileGrid';
import { PROFILE_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProfileContext from '../../context/Profile-context';

const ProfileData = ({ logged_in_user, children }) => {
    const { username, section } = useParams()
    const { data, error } = useQuery(PROFILE_QUERY, { variables: { username } });
    const [state, setState] = useState({})
    console.log(state)
    useEffect(() => {
        if (data) setState(data.profile);
    }, [data]);

    if (!data) return <LoadingSpinner />
    if (!state.intro) return <></>

    return <ProfileContext.Provider value={{ state, setState, logged_in_user, section }}>
        <ProfileGrid
            resData={state}
            section={section}
        />
    </ProfileContext.Provider>


}

export default ProfileData;




