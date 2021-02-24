import React, { useEffect, useState, useRef } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import useLazyQueryHook from '../../custom_hooks/useLazyQueryHook';
import ExploreGrid from './ExploreGrid';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreFetch = () => {
    const [values, setValues] = useState([]);
    const total = useRef();
    const { search } = useLocation()
    const { data, refetch, getData } = useLazyQueryHook(EXPLORE_ITEMS_QUERY);

    useEffect(() => {
        if (getData) getData();
    }, [])

    useEffect(() => {
        if (search) getData({ variables: { filters: queryString.parse(search) } })
    }, [search])

    useEffect(() => {
        if (data && data.explore_items) {
            setValues(data.explore_items.items);
            if (data.explore_items.total) total.current = data.explore_items.total
        }
    }, [data]);


    console.log("!!!!->>>", queryString.parse(search))


    return <ExploreGrid
        items={values}
        total={total.current}
        loadMoreData={refetch}
    />
}



export default ExploreFetch
