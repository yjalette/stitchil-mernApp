import React from 'react';
import ListItem from '../../layout/ListItem';

const GigHighlights = ({ item }) => (
    <>
        <ListItem field="from $" content={item.price} />
        <ListItem field="delivery " content={`${item.delivery} days`} />
    </>
)


export default GigHighlights
