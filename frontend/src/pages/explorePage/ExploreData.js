import React, { useEffect, useState } from 'react';
import useQueryHook from '../../custom_hooks/useQueryHook'
import ExploreGrid from './ExploreGrid';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreData = () => {
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({});
    const [price, setPrice] = useState({});
    const [values, setValues] = useState([]);
    const { data, refetch, fetchMore, updateQuery } = useQueryHook(EXPLORE_ITEMS_QUERY, { filters, price, page: Number(page) });

    useEffect(() => {
        if (data && data.explore_items) setValues(data.explore_items.items)
    }, [data]);

    useEffect(() => {
        if (filters && refetch) refetch();
        console.log("filters")
    }, [filters, refetch]);

    // useEffect(() => {
    //     if (page && updateQuery) {
    //         updateQuery((prev, newRes) => {
    //             console.log(newRes)
    //         })
    //     }
    // }, [page, updateQuery])

    useEffect(() => {
        if (price && refetch) refetch();
        console.log("price")
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
        total={data && data.explore_items && data.explore_items.total && data.explore_items.total}
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
