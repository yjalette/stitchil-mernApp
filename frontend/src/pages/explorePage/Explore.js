import React from 'react'
import { useLocation } from 'react-router-dom';

import ExploreHeader from './ExploreHeader';
import ExploreMenu from './ExploreMenu';

import './style.css'

const Explore = () => {
    const { pathname } = useLocation();

    return (
        <div className="explore">
            <ExploreHeader />
            <ExploreMenu />
        </div>
    )
}

export default Explore
