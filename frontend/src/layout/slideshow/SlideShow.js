import React from 'react';


import useSlides from '../../custom_hooks/useSlides';
import CustomModal from '../CustomModal';

const SlideShow = ({ items, currentIndex, header, children }) => {
    const { handleForward, handleBackward, activeIndex } = useSlides(currentIndex, items);
    return (
        <CustomModal modal_class="slides-wrapper" modal_header={header} displayWithoutBtn={true}>
            <div className="slides__item  w-100 ">
                <div className="slides__item__wrapper flex-center h-100">
                    {/* {currentItem(activeIndex)} */}
                    {children}
                </div>
            </div>
            {items && items.length > 1 && <div className="slides__controls">
                <i className="fa fa-angle-left " onClick={handleBackward}></i>
                <i className="fa fa-angle-right " onClick={handleForward}></i>
            </div>}
        </CustomModal>

    )
}

export default SlideShow;

