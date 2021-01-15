import React from 'react'
import IconTextButton from '../../../layout/buttons/IconTextButton'

const FilterSelected = ({ filters, deleteSelected, children }) => (
    <div className="exploreParam">
        <div className="exploreParam__items">
            {Object.keys(filters).map(filter => {
                if (Array.isArray(filters[filter])) return filters[filter].map(elem => <IconTextButton
                    key={elem}
                    title={elem}
                    onClick={({ target }) => deleteSelected(filter, target.value)}
                    btn_class="exploreParam__selected"
                    icon="fa fa-close" />)

                else return <IconTextButton
                    key={filter}
                    title={filters[filter]}
                    onClick={({ target }) => deleteSelected(filter, target.value)}
                    btn_class="exploreParam__selected"
                    icon="fa fa-close" />
            })}
        </div>
        {children}
    </div>
)


export default FilterSelected
