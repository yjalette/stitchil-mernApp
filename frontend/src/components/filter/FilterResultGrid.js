import React from 'react'
import CustomButton from '../../layout/button/CustomButton'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import ItemList from '../items/ItemList'
import Pagination from '../pagination/Pagination'

const FilterResultGrid = ({ items, total, loadMoreData, activePage, children }) => {
    return (
        <SectionWrapper>
            {children}
            {total && <div className="filterGrid__header flex-center justify-content-between w-100">
                <SectionHeader title={`${total} result${total % 10 == 1 ? "" : "s"}`} />
                <span className="clickElem"> sort</span>
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
                            { field: "delivery", content: `${item.delivery} days` },
                            { field: "price starts at", content: `$${item.price}` }
                        ],
                        sideMenu: <CustomButton btn_class="btn-icon" icon="far fa-heart" />
                    }
                }} />
            {total && <div className="filterGrid__footer flex-center w-100">
                {/* <SectionHeader title={`${total} result${total % 10 == 1 ? "" : "s"}`} /> */}
                <Pagination count={total} onClick={loadMoreData} activePage={activePage} />
            </div>}
        </SectionWrapper>
    )
}

export default FilterResultGrid
