import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';
import ProfilePageContext from '../../context/Profile-context';
import ProfileGrid from './ProfileGrid';
import useQueryHook from '../../custom_hooks/useQueryHook';
import { PROFILE_USER_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';


const ProfileData = ({ logged_in_user }) => {
    const { username, section } = useParams();
    const { data, updateQuery } = useQueryHook(PROFILE_USER_QUERY, { username });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.userProfile);
    }, [data]);

    const handleNewItem = newItem => {
        updateQuery(prev => ({
            userProfile: {
                ...prev.userProfile,
                [section]: [newItem, ...prev.userProfile[section]]
            }
        }));
    };


    const handleUpdate = (item, index) => {
        updateQuery(prev => {
            const newState = [...prev.userProfile[section]]
            newState.splice(index, 1, item);
            return {
                userProfile: {
                    ...prev.userProfile,
                    [section]: newState
                }
            }
        })
    }

    const handleDeleteItem = async itemId => await updateQuery(prev => ({
        userProfile: {
            ...prev.userProfile,
            [section]: prev.userProfile[section].filter(item => item._id !== itemId)
        }
    }))


    if (!data) return <LoadingSpinner />

    const sectionProps = { values: values[section], updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem };

    return (
        <ProfilePageContext.Provider value={{ logged_in_user, updateQuery }}>
            <ProfileGrid resData={values} activeSection={section} sectionProps={sectionProps} />
        </ProfilePageContext.Provider>
    )

}

export default ProfileData;

