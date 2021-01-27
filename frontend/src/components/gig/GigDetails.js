import React from 'react'

import ListItem from '../../layout/ListItem';

const GigDetails = ({ item }) => (
    < section className="d-flex flex-column justify-content-evenly" >
        {/* <h5>I will create perfect a {item.title} for you</h5> */}
        <ListItem field="title: " content={item.title} />
        <ListItem field="description: " content={item.description} maxWords="25" />
        <ListItem field="category: " content={item.category} />
        <ListItem field="styles: " content={`${item.styles}`} />
        <ListItem field="fabric: " content={item.fabric} />
        <ListItem field="price starts at: " content={`$${item.price}`} />
        <ListItem field="delivery: " content={`${item.delivery} days`} />
        <ListItem field="keywords: " content={item.keywords} />
        {/* <div className="gigs__item-fields">
            
        </div> */}
    </section >
)

export default GigDetails


