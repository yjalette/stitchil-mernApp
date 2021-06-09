


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
    const { section } = useParams();

    useEffect(() => {
        if (section) return onScroll(section)
    }, [section])

    const handleClick = param => push(`/homepage/${param}/`);

    if (section) {
        return (
            <Element name={section.toString()}>
                <HomePage display={section} />
            </Element>
        )
    }
    return (
        <div className="landing">
            <HeroBox onClick={handleClick} />
            {section === "about" && <HomePage />}
        </div>
    )
};

export default Landing;
