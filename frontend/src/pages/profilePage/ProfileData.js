import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';
import ProfilePageContext from '../../context/Profile-context';
import ProfileGrid from './ProfileGrid';
import useQueryHook from '../../custom_hooks/useQueryHook';
import { PROFILE_USER_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';
import ItemGrid from './profileItems/ItemGrid';
import ReviewGrid from './profileReview/ReviewGrid';

const ProfileData = ({ logged_in_user }) => {
    const { username, section } = useParams();
    const { data, updateQuery } = useQueryHook(PROFILE_USER_QUERY, { username });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) console.log(data) || setValues(data.userProfile);
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


    const dataProps = { updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem }
    return (
        <ProfilePageContext.Provider value={{ logged_in_user, updateQuery }}>
            <ProfileGrid resData={values} activeSection={section}>
                <>
                    <ItemGrid values={values[section]} {...dataProps} />
                    {/* <ReviewGrid values={values.reviews || []} {...dataProps} /> */}
                </>
            </ProfileGrid>

        </ProfilePageContext.Provider>
    )

}

export default ProfileData;

