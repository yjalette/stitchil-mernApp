import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import './style.css';
import { ProfileGrid } from './ProfileGrid';
import { PROFILE_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProfileData = () => {
    const { username, section } = useParams()
    const { data } = useQuery(PROFILE_QUERY, { variables: { username } });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.profile);
    }, [data]);

    if (!data) return <LoadingSpinner />
    if (!values.intro) return <></>

    return <ProfileGrid
        resData={values}
        section={section}
    />

}

export default ProfileData;




