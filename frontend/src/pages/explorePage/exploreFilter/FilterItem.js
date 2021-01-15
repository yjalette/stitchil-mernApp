import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../../layout/CustomDropdown';

const FilterItem = ({ defaultOptions, selectedOptions, onFilter, filterName }) => {
    const [options, setOptions] = useState(defaultOptions);

    useEffect(() => {
        if (selectedOptions) setOptions(options.filter(option => !selectedOptions.includes(option)))
    }, [selectedOptions])

    return <CustomDropdown items={options} btn_title={filterName} btn_class="menuButton fa fa-caret-down" onClick={onFilter} />
}

export default FilterItem
