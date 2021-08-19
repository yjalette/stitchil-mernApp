import React from 'react'
import ListItem from '../../layout/ListItem';

const PackageDetails = ({ selected_package, fabric_selection }) => {
    if (!selected_package) return null;
    return (
        <div className="packageDetails">
            <ListItem field="package type" content={`${selected_package.type}`} />
            <ListItem field="price(USD)" content={`$${selected_package.price}`} />
            <ListItem field="delivery" content={`${selected_package.delivery} days`} />
            {fabric_selection}
        </div>
    )
}

export default PackageDetails
