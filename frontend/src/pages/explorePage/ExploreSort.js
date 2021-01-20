import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../layout/CustomDropdown';

const ExploreSort = ({ onClick }) => {
    // const [options, setOptions] = useState(defaultOptions);

    // useEffect(() => {
    //     if (selectedOptions) setOptions(options.filter(option => !selectedOptions.includes(option)))
    //     else setOptions(defaultOptions)
    // }, [selectedOptions])

    return <CustomDropdown items={["price", "newest"]} btn_title="sort" btn_class="menuButton menuButton-sort fa fa-caret-down" onClick={onClick} />
}

export default ExploreSort
