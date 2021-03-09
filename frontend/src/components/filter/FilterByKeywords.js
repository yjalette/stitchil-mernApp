import React from 'react';
import { useHistory } from 'react-router-dom';
import FormSearch from '../inputs/FormSearch';

const FilterByKeywords = () => {
    const { push } = useHistory();

    const findItems = keywords => push(`/search/${keywords.toString()}`)

    return <FormSearch handleSearch={findItems} />
}

export default FilterByKeywords
