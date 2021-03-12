import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import ItemGrid from './ItemGrid';
import { ITEM_QUERY } from './graphql/queries';

const ItemData = () => {
    const { itemId } = useParams()
    const { data, updateQuery } = useQuery(ITEM_QUERY, { variables: { itemId }, skip: !itemId });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.item)
    }, [data])

    const handleUpdate = (item) => updateQuery(prev => {
        return { item }
    })

    if (!data) return <div>loaddding....</div>

    return <ItemGrid item={values} updateItemCache={handleUpdate} />
}

export default ItemData
