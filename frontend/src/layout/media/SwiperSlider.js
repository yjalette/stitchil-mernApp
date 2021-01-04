import React, { useEffect, useRef } from 'react';
import Swiper from "swiper";

import "swiper/css/swiper.css"

const SwiperSlider = ({ items, result, pagination, initCount }) => {
    var countPerView = useRef(initCount || 3)
    var swiper = useRef();
    var story = useRef(null);

    useEffect(() => {
        story.current = new Swiper(swiper.current, {
            grabCursor: true,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    spaceBetween: 0,
                    slidesPerView: countPerView.current,
                    // slidesPerColumnFill: "row"
                },
            }
        });
    }, []);


    return (
        <div className="swiper-container" ref={swiper}>
            <div className="swiper-wrapper m-auto">
                {items.map((item, i) => <div key={i} className="swiper-slide"> {result && result(item, i)} </div>)}
            </div>
            {pagination && <div className="swiper-pagination"></div>}
            <div className="swiper-button swiper-button-next" ></div>
            <div className="swiper-button swiper-button-prev" ></div>
        </div>
    )
}

export default SwiperSlider
