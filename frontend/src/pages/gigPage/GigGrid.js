import React from 'react'
import ListItem from '../../layout/ListItem';
import ItemDetails from '../../components/items/ItemDetails'
import BoxWrapper from '../../layout/BoxWrapper';
import SectionWrapper from '../../layout/SectionWrapper';

const GigGrid = ({ gig }) => {
    return (
        <>
            <SectionWrapper>
                <ItemDetails gallery={gig.gallery || [gig.imageUrl]}>
                    <BoxWrapper>
                        <ListItem field="title: " content={gig.title || ""} />
                        <ListItem field="description: " content={gig.description} maxWords="25" />
                        <ListItem field="category: " content={gig.category || ""} />
                        <ListItem field="styles: " content={`${gig.styles || ""}`} />
                        <ListItem field="fabric: " content={gig.fabric} />
                        <ListItem field="price starts at: " content={`$${gig.price}`} />
                        <ListItem field="delivery: " content={`${gig.delivery} days`} />
                        <ListItem field="keywords: " content={gig.keywords} />
                    </BoxWrapper>
                </ItemDetails>
            </SectionWrapper>

        </>
    )
}

export default GigGrid
