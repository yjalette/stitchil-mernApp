import React from 'react';
import ItemList from '../../components/items/ItemList';
import ItemSum from '../../components/items/ItemSum';
import PaginationIndex from '../../components/pagination/PaginationIndex';
import IconTextButton from '../../layout/buttons/IconTextButton';
import ListItem from '../../layout/ListItem';
import FilterWrapper from './exploreFilter/FilterWrapper';
import SectionHeader from '../../layout/SectionHeader';
import FilterSelected from './exploreFilter/FilterSelected';
import ExploreSort from './ExploreSort';
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';
import SectionWrapper from '../../layout/SectionWrapper';

const ExploreGrid = ({ items, total, activePage, loadMoreData, filters, onFilter, price, onPriceChange, deleteSearchParam, clearAll }) => (
    <>
        <SectionWrapper>
            <FilterWrapper
                filters={filters}
                onFilter={onFilter}
                price={price}
                onPriceChange={onPriceChange}
                deleteSelected={deleteSearchParam}>
            </FilterWrapper>
        </SectionWrapper>
        {filters && Object.values(filters).length > 0 && <FilterSelected filters={filters} onClick={deleteSearchParam} />}
        <SectionWrapper>
            {total && <div className="exploreParam">
                <ExploreSort />
                <IconTextButton onClick={clearAll} title="clear form" btn_class="selected-red" icon="fa fa-close" />
            </div>}
            {items && items.length > 0 ? <ItemList
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
            /> : <EmptyResultAlert type="results" includeText={true} />}

            {total && <div className="exploreGrid__footer d-flex">
                <SectionHeader title={`${total} results`} />
                <PaginationIndex count={total} onClick={loadMoreData} activePage={activePage} />
            </div>}
        </SectionWrapper>
    </>
)

export default ExploreGrid
