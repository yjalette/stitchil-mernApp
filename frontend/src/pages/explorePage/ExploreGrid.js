import React from 'react';

import ItemList from '../../components/items/ItemList';
import PaginationIndex from '../../components/pagination/PaginationIndex';
import ListItem from '../../layout/ListItem';
import FilterWrapper from './exploreFilter/FilterWrapper';
import SectionHeader from '../../layout/SectionHeader';
import FilterSelected from './exploreFilter/FilterSelected';
import ExploreSort from './ExploreSort';
import SectionWrapper from '../../layout/SectionWrapper';
import CustomButton from '../../layout/button/CustomButton';

const ExploreGrid = ({ items, total, activePage, loadMoreData, filters, onFilter, price, onPriceChange, deleteSearchParam, clearAll }) => (
    <>
        <SectionWrapper section_class="filter">
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
                <CustomButton onClick={clearAll} btn_class="btn-icon-text btn-red" icon="fa fa-close" >clear form</CustomButton>
            </div>}
            <ItemList
                items={items}
                emptyResultType="results"
                getProps={(item) => {
                    return {
                        itemId: item._id,
                        creator: item.creator,
                        header: { title: item.title },
                        coverImage: item.coverImage,
                        highlights: [
                            { field: "fabric choices: ", content: item.fabrics },
                            { field: "price starts at: ", content: `$${item.price}` }]
                        ,
                        sideMenu: (
                            <>
                                <CustomButton btn_class="btn-icon" icon="fa fa-angle-double-right" />
                            </>
                        )
                    }
                }

                }
            />
            {total && <div className="exploreGrid__footer d-flex">
                <SectionHeader title={`${total} results`} />
                <PaginationIndex count={total} onClick={loadMoreData} activePage={activePage} />
            </div>}
        </SectionWrapper>
    </>
)

export default ExploreGrid
