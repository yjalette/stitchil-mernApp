import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBox from '../inputs/SearchBox';

const FilterByKeywords = () => {
    const [value, setValue] = useState("");
    const { search } = useLocation();
    const { push } = useHistory();

    useEffect(() => {
        if (value) push(`/search/${value.toString()}`)
    }, [value])

    return <SearchBox box_class="filterByKeywords" onClick={value => setValue(value)} />
}

export default FilterByKeywords
