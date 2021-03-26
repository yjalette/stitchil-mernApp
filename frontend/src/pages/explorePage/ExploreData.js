import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { EXPLORE_GIGS_QUERY } from './graphql/queries'
import ExploreGrid from './ExploreGrid';

const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef(null);
    const location = useLocation();
    const [getData, { data }, refetch] = useLazyQuery(EXPLORE_GIGS_QUERY);

    useEffect(() => {
        if (getData) getData();
    }, [])

    useEffect(() => {
        if (location && getData) {
            getData({ variables: { filters: location.search ? queryString.parse(location.search) : {} } })
        }
    }, [location])

    useEffect(() => {
        if (data && data.explore_gigs) {
            setValues(data.explore_gigs.items);
            total.current = data.explore_gigs.total || null
        }
    }, [data]);

    return <ExploreGrid items={values} total={total.current} loadMoreData={refetch} />
}

export default ExploreData
