import React, { useContext } from 'react';

import ItemList from '../../components/items/ItemList';
import SectionWrapper from '../../layout/SectionWrapper';
import CustomButton from '../../layout/button/CustomButton';
import SearchFilter from '../../components/search/SearchFilter';
import SearchKeywords from '../../components/search/SearchKeywords';
import PaginationIndex from '../../components/pagination/PaginationIndex';
import SectionHeader from '../../layout/SectionHeader';
import AuthContext from '../../context/Auth-context';
import ExploreHeader from './ExploreHeader';

const ExploreGrid = ({ items, total, activePage, loadMoreData }) => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <SearchKeywords />
            {user && <ExploreHeader />}
            <SearchFilter />
            {/* <PaginationIndex /> */}
            <SectionWrapper>
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
                                { field: "price starts at", content: `$${item.price}` }
                            ],
                            sideMenu: <CustomButton btn_class="btn-icon" icon="fa fa-heart" />
                        }
                    }} />
                {total && <div className="exploreGrid__footer d-flex">
                    <SectionHeader title={`${total} results`} />
                    <PaginationIndex count={total} onClick={loadMoreData} activePage={activePage} />
                </div>}
            </SectionWrapper>
        </>
    )
}

export default ExploreGrid
