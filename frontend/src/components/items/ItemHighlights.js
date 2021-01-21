import React from 'react';
import ListItem from '../../layout/ListItem';

const ItemHighlights = ({ highlights }) => { Object.keys(highlights).map((label, index) => <ListItem key={index} field={label} content={highlights[label]} />) }

export default ItemHighlights
