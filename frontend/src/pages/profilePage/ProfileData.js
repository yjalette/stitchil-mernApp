import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import './style.css';
import ProfilePageContext from '../../context/Profile-context';
import ProfileGrid from './ProfileGrid';
import { PROFILE_QUERY } from './graphql/queries';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProfileData = ({ logged_in_user, section, username }) => {
    const { data, updateQuery } = useQuery(PROFILE_QUERY, { variables: { username } });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.profile);
    }, [data]);

    const handleNewItem = newItem => console.log(newItem) || updateQuery(prev => {
        return {
            profile: {
                ...prev.profile,
                [section]: [newItem, ...prev.profile[section]]
            }
        }
    });

    const handleUpdate = (item, index) => updateQuery(prev => {
        const newState = [...prev.profile[section]]
        newState.splice(index, 1, item);
        return {
            profile: {
                ...prev.profile,
                [section]: newState
            }
        }
    })

    const handleDeleteItem = itemId => updateQuery(prev => {
        return {
            profile: {
                ...prev.profile,
                [section]: prev.profile[section].filter(item => item._id !== itemId)
            }
        }
    })


    if (!data) return <LoadingSpinner />

    console.log(values)

    const sectionProps = { updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem };

    return (
        <ProfilePageContext.Provider value={{ logged_in_user, updateQuery }}>
            {values.intro && <ProfileGrid resData={values} section={section} sectionProps={sectionProps} />}
        </ProfilePageContext.Provider>
    )

}

export default ProfileData;




// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/react-hooks';

// import './style.css';
// import ProfilePageContext from '../../context/Profile-context';
// import ProfileGrid from './ProfileGrid';
// import { PROFILE_USER_QUERY } from './graphql/queries';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const ProfileData = ({ logged_in_user, section, username }) => {
//     const { data, updateQuery } = useQuery(PROFILE_USER_QUERY, { variables: { username } });
//     const [values, setValues] = useState({});

//     useEffect(() => {
//         if (data) setValues(data.userProfile);
//     }, [data]);

//     const handleNewItem = newItem => console.log(newItem) || updateQuery(prev => {
//         return {
//             userProfile: {
//                 ...prev.userProfile,
//                 [section]: [newItem, ...prev.userProfile[section]]
//             }
//         }
//     });

//     const handleUpdate = (item, index) => updateQuery(prev => {
//         const newState = [...prev.userProfile[section]]
//         newState.splice(index, 1, item);
//         return {
//             userProfile: {
//                 ...prev.userProfile,
//                 [section]: newState
//             }
//         }
//     })

//     const handleDeleteItem = itemId => updateQuery(prev => {
//         return {
//             userProfile: {
//                 ...prev.userProfile,
//                 [section]: prev.userProfile[section].filter(item => item._id !== itemId)
//             }
//         }
//     })


//     if (!data) return <LoadingSpinner />

//     const sectionProps = { updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem };

//     return (
//         <ProfilePageContext.Provider value={{ logged_in_user, updateQuery }}>
//             <ProfileGrid resData={values} section={section} sectionProps={sectionProps} />
//         </ProfilePageContext.Provider>
//     )

// }

// export default ProfileData;

