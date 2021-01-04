


import React, { useEffect } from 'react';
import { Element, animateScroll as scroll, scroller } from 'react-scroll';
import { useHistory, useParams } from 'react-router-dom';

import './style.css'

import HomePage from './HomePage';
import HeroBox from './HeroBox';

const onScroll = (elem) => scroller.scrollTo(elem.toString(), {
    duration: 1500,
    smooth: true,
    offset: 20
})

const Landing = () => {
    const { push } = useHistory();
    const { page } = useParams();

    useEffect(() => {
        if (page) return onScroll(page)
    }, [page])

    const handleClick = param => push(`/homepage/${param}`);

    return (
        <div className="landing">
            <HeroBox onClick={handleClick} />
            {page && <Element name={page.toString()}>
                <HomePage display={page} />
            </Element>}
            {page === "about" && <HomePage />}
        </div>
    )
};

export default Landing;
