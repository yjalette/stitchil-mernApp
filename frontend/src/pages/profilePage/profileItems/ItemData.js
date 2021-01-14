import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { itemReducer } from './itemReducer';
import ItemGrid from './ItemGrid';
import ItemCreate from './ItemCreate';
import EmptyResultAlert from '../../../layout/alerts/EmptyResultAlert';
import SectionHeader from '../../../layout/SectionHeader';
import useQueryHook from '../../../custom_hooks/useQueryHook';
import ProfileContext from '../../../context/Profile-context';
import ProfileItemContext from '../../../context/ProfileItem-context';

const ItemData = ({ query }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { username, section } = useParams();
    const [comp, dispatch] = useReducer(itemReducer, section.toUpperCase());
    const { data, updateQuery } = useQueryHook(query, { username });
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (section) dispatch({ type: section.toUpperCase() });
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
                {values && values.length === 0 && <EmptyResultAlert type={section} />}
            </section>
        </ProfileItemContext.Provider>
    )
}

export default ItemData
