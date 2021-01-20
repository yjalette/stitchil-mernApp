import React from 'react'
import IconTextButton from '../../../layout/buttons/IconTextButton'

const FilterSelected = ({ filters, onClick }) => console.log(filters) || (

    <div className="exploreParam__items">
        {Object.keys(filters).map(filter => {
            if (Array.isArray(filters[filter])) return filters[filter].map(elem => <IconTextButton
                key={elem}
                title={elem}
                onClick={({ target }) => onClick(filter, target.value)}
                btn_class="exploreParam__selected"
                icon="fa fa-close" />)

        })}
    </div>
)

// return <IconTextButton
//                     key={filter}
//                     title={filters[filter]}
//                     onClick={({ target }) => onClick(filter, target.value)}
//                     btn_class="exploreParam__selected"
//                     icon="fa fa-close" />

export default FilterSelected
