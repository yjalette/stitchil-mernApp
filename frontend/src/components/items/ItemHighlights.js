import React from 'react';
import ListItem from '../../layout/ListItem';

const ItemHighlights = ({ highlights }) => console.log(highlights) || (
    <>
        { highlights.map((item, index) => console.log(item) || <ListItem key={index} {...item} />)}
    </>
)

export default ItemHighlights
