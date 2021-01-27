import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemGrid from './ItemGrid';
import useQueryHook from '../../../custom_hooks/useQueryHook';
import { query_get } from './api';

const ItemData = () => {
    const { username, section } = useParams();
    const { data, updateQuery } = useQueryHook(query_get[section], { username });
    const [values, setValues] = useState([]);

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

    const props = { values, updateItemCache: handleUpdate, addItemCache: handleNewItem, deleteItemCache: handleDeleteItem }

    return <ItemGrid {...props} />
}

export default ItemData



