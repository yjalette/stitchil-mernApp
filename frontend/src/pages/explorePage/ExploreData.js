import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { EXPLORE_GIGS_QUERY } from './graphql/queries'
import FilterResultGrid from '../../components/filter/FilterResultGrid';
import FilterByOptions from '../../components/filter/FilterByOptions';

const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef();
    const location = useLocation();

    const [getData, { data, refetch }] = useLazyQuery(EXPLORE_GIGS_QUERY);

    useEffect(() => {
        if (getData) getData();
    }, [])

    useEffect(() => {
        if (location && getData) getData({ variables: location.search ? { filters: queryString.parse(location.search) } : null })
    }, [location, getData])

    useEffect(() => {
        if (data && data.explore_gigs) {
            setValues(data.explore_gigs.items);
            if (data.explore_gigs.total) total.current = data.explore_gigs.total
        }
    }, [data]);

    return (
        <FilterResultGrid items={values} total={total.current} loadMoreData={getData}>
            <FilterByOptions />
        </FilterResultGrid>
    )
}

export default ExploreData
