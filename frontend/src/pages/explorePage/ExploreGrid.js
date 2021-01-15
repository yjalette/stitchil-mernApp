import React from 'react';
import ItemList from '../../components/items/ItemList';
import ItemSum from '../../components/items/ItemSum';
import IconTextButton from '../../layout/buttons/IconTextButton';
import ListItem from '../../layout/ListItem';
import FilterWrapper from './exploreFilter/FilterWrapper';

const ExploreGrid = ({ items, filters, onFilter, price, onPriceChange, deleteSearchParam, clearFilters }) => (
    <div className="exploreGrid">
        <FilterWrapper
            filters={filters}
            onFilter={onFilter}
            price={price}
            onPriceChange={onPriceChange}
            clearButton={<IconTextButton onClick={clearFilters} title="clear filters" btn_class="exploreParam__selected-red" icon="fa fa-close" />}
            deleteSelected={deleteSearchParam} />

        {items && items.length > 0 && <ItemList
            items={items}
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

export default ExploreGrid
