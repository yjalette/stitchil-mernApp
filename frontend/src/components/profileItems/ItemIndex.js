import React, { useReducer, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ItemData from './ItemData';

import { itemReducer } from './itemReducer';

const ItemIndex = ({ section }) => {
    const { username } = useParams();
    const [comp, dispatch] = useReducer(itemReducer, section.toUpperCase());

    useEffect(() => {
        dispatch({ type: section.toUpperCase() });
    }, [section]);

    return <ItemData comp={comp} section={section} username={username} />
}

export default ItemIndex
