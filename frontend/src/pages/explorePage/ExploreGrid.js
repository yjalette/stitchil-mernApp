import React from 'react';
import FilterByOptions from '../../components/filter/FilterByOptions';
import SectionWrapper from '../../layout/SectionWrapper';
import SectionHeader from '../../layout/SectionHeader';
import ItemList from '../../components/items/ItemList';
import CustomButton from '../../layout/button/CustomButton';
import Pagination from '../../components/pagination/Pagination';

const ExploreGrid = ({ items, total, loadMoreData }) => {
    return (
        <>
            <SectionWrapper section_class="filterGrid">
                <FilterByOptions />
                {total && <section className="filterGrid__header">
                    <SectionHeader title={`${total} result${total % 10 == 1 ? "" : "s"}`} />
                    <span className="clickElem"> sort</span>
                </section>}
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
                                { field: "category", content: item.category },
                                { field: "garment", content: item.garment }
                            ],
                            sideMenu: <CustomButton btn_class="btn-icon" icon="far fa-heart" />
                        }
                    }} />
            </SectionWrapper>
            {total && <SectionWrapper section_class="filterGrid__footer">
                <Pagination count={total} onClick={loadMoreData} />
            </SectionWrapper>}
        </>
    )
}

export default ExploreGrid
