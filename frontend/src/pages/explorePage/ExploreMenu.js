import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { filters } from '../../constants/categories'
import SwiperSlider from '../../layout/media/SwiperSlider';
import ExploreCard from './ExploreCard';

const ExploreMenu = () => {
    const { section } = useParams();
    const { push } = useHistory();

    const handleCategory = newCategory => push({ pathname: `/filter/${section || "gigs"}/${newCategory}` });

    const resultWithImage = item => <ExploreCard item={item} onClick={handleCategory} />

    if (!section) return <SwiperSlider items={filters.gigs.categories} result={resultWithImage} initCount="4" pagination={true} />

    return (
        <div className="explore__menu">
            <div className="explore__cards-list explore__grid-container">
                {filters[section || "gigs"].categories.map((cat, i) => <ExploreCard key={i} item={cat} onClick={handleCategory} />)}
            </div>
        </div>
    )
}

export default ExploreMenu;


