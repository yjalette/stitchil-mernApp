import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';

import SearchBox from '../inputs/SearchBox';

const SearchResult = ({ data, handleSearch }) => {
    const { pathname } = useLocation();

    return (
        <div>
            <SearchBox box_class="explore__search" onClick={handleSearch} />
            <DataList dataList={data} />
        </div>
    )
}

export default SearchResult
