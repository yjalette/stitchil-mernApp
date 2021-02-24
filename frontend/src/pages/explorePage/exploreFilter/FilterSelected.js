import React from 'react'
import CustomButton from '../../../layout/button/CustomButton'

const FilterSelected = ({ filters, onClick }) => console.log(filters) || (
    <div className="exploreParam__items">
        {Object.keys(filters).map(filter => {
            if (Array.isArray(filters[filter])) return filters[filter].map(elem => <CustomButton
                key={elem}
                btn_class="btn-icon-text exploreParam__selected"
                onClick={({ target }) => onClick(filter, target.value)}
                icon="fa fa-close"
                btn_otherProps={{
                    value: elem
                }}
            >{elem}</CustomButton>)

        })}
    </div>
)

export default FilterSelected
