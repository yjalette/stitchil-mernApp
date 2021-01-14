import React from 'react'
import IconTextButton from '../../../layout/buttons/IconTextButton'

const FilterParam = ({ filters }) => {
    return (
        <div>
            {filters && filters.map(filter => <IconTextButton key={filter} title={filter} btn_class="iconTextButton-red" icon="fa fa-close redIcon" />)}
        </div>
    )
}

export default FilterParam
