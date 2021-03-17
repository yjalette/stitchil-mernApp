import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

import { EXPLORE_GIGS_QUERY } from './graphql/queries'
import FilterResultGrid from '../../components/filter/FilterResultGrid';
import FilterByOptions from '../../components/filter/FilterByOptions';
import SectionWrapper from '../../layout/SectionWrapper';
import SectionHeader from '../../layout/SectionHeader';
import ItemList from '../../components/items/ItemList';
import CustomButton from '../../layout/button/CustomButton';
import Pagination from '../../components/pagination/Pagination';


const ExploreData = () => {
    const [values, setValues] = useState([]);
    const total = useRef(null);
    const location = useLocation();
    const { data, refetch } = useQuery(EXPLORE_GIGS_QUERY);

    useEffect(() => {
        if (location && refetch) {
            refetch({ filters: location.search ? queryString.parse(location.search) : {} })
        }
    }, [location, refetch])

    useEffect(() => {
        if (data && data.explore_gigs) {
            setValues(data.explore_gigs.items);
            total.current = data.explore_gigs.total || null
        }
    }, [data]);

    return (
        <>
            <SectionWrapper section_class="filterGrid">
                <FilterByOptions />
                {total.current && <section className="filterGrid__header">
                    <SectionHeader title={`${total.current} result${total.current % 10 == 1 ? "" : "s"}`} />
                    <span className="clickElem"> sort</span>
                </section>}
                <ItemList
                    items={values}
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
            {total.current && <SectionWrapper section_class="filterGrid__footer">
                <Pagination count={total.current} onClick={refetch} />
            </SectionWrapper>}
        </>
    )
}

export default ExploreData
