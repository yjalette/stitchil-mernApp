import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { ITEM_QUERY } from './graphql/queries';

const ItemData = ({ itemId, recieverComp }) => {
    const { data, updateQuery } = useQuery(ITEM_QUERY, { variables: { itemId }, skip: !itemId });
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (data) setItem(data.item)
    }, [data])

    if (!data) return <div>loaddding....</div>

    return item && recieverComp(item)
}

export default ItemData
