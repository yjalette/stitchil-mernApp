import React, { useEffect, useState } from 'react'

const useSlides = (currentIndex, slides) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    const handleForward = () => setActiveIndex(slides.length - 1 === activeIndex ? 0 : activeIndex + 1)
    const handleBackward = () => setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)

    return {
        handleForward,
        handleBackward,
        activeIndex,
        activeSlide: slides[activeIndex],
        setActiveIndex
    }
}

export default useSlides
