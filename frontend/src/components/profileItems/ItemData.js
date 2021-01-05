import React, { useState, useEffect, useContext } from 'react';

import ProfileItemContext from '../../context/ProfileItem-context'
import useGetData from '../../custom_hooks/useGetData';
import ItemGrid from './ItemGrid';
import ItemCreate from './ItemCreate';
import ProfileContext from '../../context/Profile-context';
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';
import SectionHeader from '../../layout/SectionHeader';

const ItemData = ({ comp, section, username }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { data, error, getData, updateQuery } = useGetData(`profile${section}`);
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (section) getData({ variables: { username } });
    }, [section]);

    useEffect(() => {
        if (data) setValues(data[`profile_${section}`]);
    }, [data]);

    const handleNewItem = newItem => updateQuery(prev => ({
        [`profile_${section}`]: [newItem, ...prev[`profile_${section}`]]
    }))

    const handleUpdate = (item, index) => {
        updateQuery(prev => {
            const newState = [...prev[`profile_${section}`]]
            newState.splice(index, 1, item);
            return { [`profile_${section}`]: newState }
        })
    }

    const handleDeleteItem = async itemId => await updateQuery(prev => ({
        [`profile_${section}`]: prev[`profile_${section}`].filter(item => item._id !== itemId)
    }))


    return (
        <ProfileItemContext.Provider value={{ updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem, comp }}>
            <section className={section}>
                <SectionHeader title={section}>
                    {logged_in_user && <ItemCreate overLimit={values && values.length > 2 ? true : false} />}
                </SectionHeader>
                <ItemGrid values={values} />
                {values.length === 0 && <EmptyResultAlert type={section} />}
            </section>
        </ProfileItemContext.Provider>
    )
}

export default ItemData
