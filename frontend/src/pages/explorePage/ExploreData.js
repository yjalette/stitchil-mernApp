import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { EXPLORE_GIGS_QUERY } from './graphql/queries'
import FilterResultGrid from '../../components/filter/FilterResultGrid';
import FilterByOptions from '../../components/filter/FilterByOptions';

const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef(null);
    const location = useLocation();
    const { data, refetch } = useQuery(EXPLORE_GIGS_QUERY);

    useEffect(() => {
        if (location && refetch) {
            refetch({ filters: location.search ? queryString.parse(location.search) : {} })
        }
    }, [location, refetch])


    useEffect(() => {
        if (data && data.explore_gigs) {
            setValues(data.explore_gigs.items);
            total.current = data.explore_gigs.total || null
        }
    }, [data]);

    return (
        <FilterResultGrid items={values} total={total.current} loadMoreData={refetch}>
            <FilterByOptions />
        </FilterResultGrid>
    )
}

export default ExploreData
