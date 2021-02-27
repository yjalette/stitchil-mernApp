import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import ExploreGrid from './ExploreGrid';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef();
    const location = useLocation()
    const [getData, { data, refetch }] = useLazyQuery(EXPLORE_ITEMS_QUERY);

    useEffect(() => {
        if (getData) getData();
    }, [])

    useEffect(() => {
        if (location) getData({ variables: location.search ? { filters: queryString.parse(location.search) } : null })
    }, [location])

    useEffect(() => {
        if (data && data.explore_items) {
            setValues(data.explore_items.items);
            if (data.explore_items.total) total.current = data.explore_items.total
        }
    }, [data]);

    return <ExploreGrid items={values} total={total.current} loadMoreData={refetch} />
}

export default ExploreData
