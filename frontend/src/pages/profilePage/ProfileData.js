import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import './style.css';
import { ProfileGrid } from './ProfileGrid';
import { PROFILE_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProfileData = () => {
    const { username, section } = useParams()
    const { data, updateQuery } = useQuery(PROFILE_QUERY, { variables: { username } });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.profile);
    }, [data]);


    const addItemCache = useCallback(
        newItem => updateQuery(prev => {
            return {
                profile: {
                    ...prev.profile,
                    [section]: [newItem, ...prev.profile[section]]
                }
            }
        }),
        [section]
    )


    if (!data) return <LoadingSpinner />

    if (!values.intro) return <></>

    const sectionProps = { addItemCache };

    return <ProfileGrid
        resData={values}
        section={section}
        {...sectionProps}
    //  sectionProps={sectionProps}
    />

}

export default ProfileData;




