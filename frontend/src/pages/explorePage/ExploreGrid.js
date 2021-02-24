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
import SearchFilter from '../../components/search/SearchFilter';
import SearchParam from '../../components/search/SearchParam';

const ExploreGrid = ({ items, total, loadMoreData }) => (
    <>
        <SectionWrapper section_class="filter">
            <SearchFilter />
        </SectionWrapper>
        <SearchParam />
        <SectionWrapper>
            {/* {total && <div className="exploreParam">
                <ExploreSort />
                <CustomButton onClick={clearAll} btn_class="btn-icon-text btn-red" icon="fa fa-close" >clear form</CustomButton>
            </div>} */}
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
                            { field: "delivery", content: `${item.delivery} days` },
                            { field: "price starts at", content: `$${item.price}` }]
                        ,
                        sideMenu: (
                            <>
                                <CustomButton btn_class="btn-icon" icon="fa fa-heart" />
                            </>
                        )
                    }
                }

                }
            />
            {/* {total && <div className="exploreGrid__footer d-flex">
                <SectionHeader title={`${total} results`} />
                <PaginationIndex count={total} onClick={loadMoreData} activePage={activePage} />
            </div>} */}
        </SectionWrapper>
    </>
)

export default ExploreGrid
