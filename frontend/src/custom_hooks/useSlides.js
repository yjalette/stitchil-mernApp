import React, { useState } from 'react'
import CustomButton from '../layout/button/CustomButton';
import GroupButton from '../layout/button/GroupButton';

const useSlides = (currentIndex, slides, pagination) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    const handleForward = () => setActiveIndex(slides.length - 1 === activeIndex ? 0 : activeIndex + 1)
    const handleBackward = () => setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)

    const buttons = <GroupButton group_class="slide-buttons">
        <CustomButton onClick={handleBackward} icon="fas fa-arrow-left" btn_class={`${activeIndex !== 0 ? "btn-icon-text btn-back" : "invisible"} `}></CustomButton>
        {pagination && <span className="slide-pagination text-muted">{activeIndex + 1}/{slides.length}</span>}
        <CustomButton onClick={handleForward} icon="fas fa-arrow-right" btn_class={`${activeIndex + 1 === slides.length ? "invisible" : "btn-icon-text btn-forward"} `}>
        </CustomButton>
    </GroupButton>

    return {
        handleForward,
        handleBackward,
        activeIndex,
        activeSlide: slides[activeIndex],
        setActiveIndex,
        buttons
    }
}

export default useSlides
