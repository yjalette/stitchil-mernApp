import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBox from '../inputs/SearchBox';

const ExploreSearch = ({ searchData }) => {
    const { push } = useHistory();
    const { state } = useLocation();
    const keyWords = state;

    useEffect(() => {
        if (searchData) searchData(keyWords);
    }, [searchData, keyWords])

    const handleSearch = keyWords => push({ pathname: `/filter/gigs/search`, state: { keyWords } });

    return <SearchBox className="explore__search" handleSearch={handleSearch} />
}

export default ExploreSearch
