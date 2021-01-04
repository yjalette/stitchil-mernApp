import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import useGetData from '../../custom_hooks/useGetData';
import SearchResult from './SearchResult';
import SearchBox from '../inputs/SearchBox';

const SearchContainer = () => {
    const [dataList, setDataList] = useState(null);
    const [keyWords, setKeyWords] = useState("");
    const { section, category } = useParams();
    const { data, getData } = useGetData(`filter_${section}`);
    const { push } = useHistory();
    const { pathname } = useLocation();

    useEffect(() => {
        console.log(keyWords)
        if (keyWords) getData({ variables: { keyWords } })
    }, [keyWords])

    useEffect(() => {
        if (data) setDataList(data[`filter_${section}`]);
    }, [data])


    const handleSearch = keyWords => {
        if (pathname.includes("explore")) push({ pathname: `/filter/gigs/search` });
        setKeyWords(keyWords);
    };

    if (pathname.includes("explore")) return <SearchBox box_class="explore__search" onClick={handleSearch} />

    return <SearchResult data={dataList} handleSearch={handleSearch} />
}

export default SearchContainer
