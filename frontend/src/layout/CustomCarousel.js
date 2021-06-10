import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = ({ slides, slides_class, getSlide }) => {
    const [index, setIndex] = useState(0);
    const handleSelect = selectedIndex => setIndex(selectedIndex);
    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            fade={true}
            keyboard={false}
            className={slides_class}
        >
            {slides.map((slide, i) => (
                <Carousel.Item className="carousel__item d-flex flex-column" key={i}>
                    {getSlide(slide)}
                </Carousel.Item>
            ))}
        </Carousel>
    )

}

export default CustomCarousel;