import React, { useEffect, useState } from 'react';

import ItemList from '../../components/items/ItemList';
import ItemSum from '../../components/items/ItemSum';
import useQueryHook from '../../custom_hooks/useQueryHook'
import ListItem from '../../layout/ListItem';
import FilterOptions from './exploreFilter/FilterOptions';
import FilterParam from './exploreFilter/FilterParam';
import { EXPLORE_ITEMS_QUERY } from './graphql/queries'

const ExploreData = () => {
    const [filters, setFilters] = useState({});
    const { data, refetch } = useQueryHook(EXPLORE_ITEMS_QUERY, { filters });
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (data && data.explore_items) setValues(data.explore_items)
    }, [data]);

    useEffect(() => {
        if (refetch) refetch();
    }, [filters]);

    const filterSearchParam = par => {
        setFilters()
    }

    return (
        <div>
            <FilterOptions inputs={filters} setInputs={setFilters} />
            <FilterParam filters={Object.values(filters)} />
            {values && values.length > 0 && <ItemList
                items={values}
                showItem={(item) => <ItemSum
                    item_title={item.title}
                    item_img={item.imageUrl}
                    item_highlights={(
                        <>
                            <ListItem field="style" content={item.style} />
                            <ListItem field="price" content={`starts at ${item.price}$`} />
                        </>
                    )}
                />}
            />}
        </div>
    )
}



export default ExploreData
