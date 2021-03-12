import React from 'react'
import ListItem from '../../layout/ListItem';
import ItemDetails from '../../components/items/ItemDetails'
import BoxWrapper from '../../layout/BoxWrapper';
import SectionWrapper from '../../layout/SectionWrapper';
import ItemUpdate from '../../components/items/ItemUpdate';

const ItemGrid = ({ item, updateItemCache }) => {
    return (
        <>
            <SectionWrapper>
                <ItemDetails gallery={item.gallery}>
                    <BoxWrapper>
                        <ListItem field="title" content={item.title} />
                        <ListItem field="description" content={item.description} maxWords="50" />
                        <ListItem field="service" content={item.service} />
                        <ListItem field="garment" content={item.garment} />
                        <ListItem field="category" content={item.category} />
                        <ListItem field="style" content={item.style} />
                        <ListItem field="occasion" content={item.occasion} />
                        <ItemUpdate item={item} updateItemCache={updateItemCache} />
                    </BoxWrapper>
                </ItemDetails>
            </SectionWrapper>
        </>
    )
}

export default ItemGrid
