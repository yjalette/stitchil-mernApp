import React, { useEffect, useState } from 'react';
import useQueryHook from '../../custom_hooks/useQueryHook'
import ExploreGrid from './ExploreGrid';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreData = () => {
    const [filters, setFilters] = useState({});
    const [price, setPrice] = useState({});
    const { data, refetch } = useQueryHook(EXPLORE_ITEMS_QUERY, { filters, price });
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (data && data.explore_items) setValues(data.explore_items)
    }, [data]);

    useEffect(() => {
        if (refetch) refetch();
    }, [filters, refetch]);

    useEffect(() => {
        if (refetch) refetch();
    }, [price, refetch]);

    const handlePrice = ({ target }) => {
        setPrice({
            ...price,
            [target.name]: Number(target.value)
        })
    }

    const handleFilter = (name, value) => {
        setFilters({
            ...filters,
            [name]: filters[name] ? [...filters[name], value] : [value]
        })
    }

    const deleteSearchParam = (key, value) => {
        setFilters({
            ...filters,
            [key]: filters[key].filter(elem => elem !== value)
        })
    }

    const clearFilters = () => setFilters({})

    return <ExploreGrid
        items={values}
        filters={filters}
        onFilter={handleFilter}
        price={price}
        onPriceChange={handlePrice}
        deleteSearchParam={deleteSearchParam}
        clearFilters={clearFilters}
    />
}



export default ExploreData
