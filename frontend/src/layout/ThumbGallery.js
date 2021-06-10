import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper';
import "swiper/swiper-bundle.css"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

const ThumbGallery = ({ items, img_class }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {items.map((item, i) => <SwiperSlide
                    key={i} className={`${img_class} swiperSlide`}
                    style={{ backgroundImage: `url(${item})` }}> </SwiperSlide>)}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                watchSlidesVisibility
                watchSlidesProgress
                slidesPerView={items.length}
                slideToClickedSlide={true}

            >
                {items.map((item, i) => <SwiperSlide key={i}
                    className={`${img_class}-thumb swiperThumb`}
                    style={{ backgroundImage: `url(${item})` }}> </SwiperSlide>)}
            </Swiper>

        </>
    );
}

export default ThumbGallery

