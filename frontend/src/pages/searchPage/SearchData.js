import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

import { SEARCH_ITEMS_QUERY } from './graphql/queries'
import FilterResultGrid from '../../components/filter/FilterResultGrid';
import FilterByOptions from '../../components/filter/FilterByOptions';

const SearchData = () => {
    const total = useRef(null);
    const [values, setValues] = useState([]);
    const { search } = useLocation();
    const { keywords } = useParams();

    const [getData, { data, refetch }] = useLazyQuery(SEARCH_ITEMS_QUERY);

    useEffect(() => {
        if (getData && keywords) getData({ variables: { filters: { keywords } } });
    }, [keywords, getData])

    console.log(search)

    useEffect(() => {
        if (search && getData) getData({ variables: { filters: { keywords, ...queryString.parse(search) } } })
    }, [search, getData])

    useEffect(() => {
        if (data && data.search_gigs) {
            setValues(data.search_gigs.items);
            if (data.search_gigs.total) total.current = data.search_gigs.total
        }
    }, [data]);

    return (
        <FilterResultGrid items={values} total={total.current} loadMoreData={getData}>
            <FilterByOptions />
        </FilterResultGrid>
    )
}

export default SearchData
