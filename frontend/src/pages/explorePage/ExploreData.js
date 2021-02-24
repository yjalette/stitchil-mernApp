import React, { useEffect, useState, useRef } from 'react';
import useLazyQueryHook from '../../custom_hooks/useLazyQueryHook';
import ExploreGrid from './ExploreGrid';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef();
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({});
    const [price, setPrice] = useState({});
    const { data, refetch, fetchMore, updateQuery } = useLazyQueryHook(EXPLORE_ITEMS_QUERY, { filters, price, page: Number(page) });

    useEffect(() => {
        if (data && data.explore_items) {
            setValues(data.explore_items.items);
            if (data.explore_items.total) total.current = data.explore_items.total
        }
    }, [data]);

    useEffect(() => {
        if (filters && refetch) refetch();
    }, [filters, refetch]);

    useEffect(() => {
        if (price && refetch) refetch();
    }, [price, refetch]);

    const handlePrice = ({ target }) => {
        setPrice({
            ...price,
            [target.name]: Number(target.value)
        })
    }

    const loadMoreData = ({ target }) => {
        setPage(target.value)
    }

    const handleFilter = (name, value) => {
        setFilters({
            ...filters,
            [name]: filters[name] ? [...filters[name], value] : [value]
        })
    }

    const deleteSearchParam = (key, value) => {
        console.log(key, value)
        const newState = filters[key].filter(elem => elem !== value)
        setFilters({
            ...filters,
            [key]: newState.length > 0 ? newState : undefined
        })
    }

    const clearAll = () => {
        setFilters({});
        setPrice({})
    }


    return <ExploreGrid
        items={values}
        total={total.current}
        activePage={page}
        loadMoreData={loadMoreData}
        filters={filters}
        onFilter={handleFilter}
        price={price}
        onPriceChange={handlePrice}
        deleteSearchParam={deleteSearchParam}
        clearAll={clearAll}
    />
}



export default ExploreData
