import React, { useState, useRef, useEffect } from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomButton from '../../layout/button/CustomButton'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import ItemList from '../items/ItemList'
import Pagination from '../pagination/Pagination'

const FilterResultGrid = ({ items, total, loadMoreData, activePage, children }) => {

    return (
        <>
            <SectionWrapper section_class="filterGrid">
                {children}
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
                <Pagination count={total} onClick={loadMoreData} activePage={activePage} />
            </SectionWrapper>}
        </>

    )
}

export default FilterResultGrid
