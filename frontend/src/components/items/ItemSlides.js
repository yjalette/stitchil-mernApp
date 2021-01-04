import React from 'react';

import useSlides from '../../custom_hooks/useSlides';
import CustomModal from '../../layout/CustomModal';

const ItemSlides = ({ items, currentItem, currentIndex, children }) => {
    const { handleForward, handleBackward, activeIndex } = useSlides(currentIndex, items);
    return (
        <CustomModal show={true} modal_class="slides-wrapper" displayWithoutBtn={true}>
            <div className="slides__item-wrapper">
                <div className="slides__item flex-center">
                    {currentItem(activeIndex) || children}
                </div>
            </div>
            {items && items.length > 1 && <div className="slides__controls">
                <i className="fa fa-angle-left " onClick={handleBackward}></i>
                <i className="fa fa-angle-right " onClick={handleForward}></i>
            </div>}
        </CustomModal>
    )
}

ItemSlides.defaultProps = {
    currentIndex: 0
}

export default ItemSlides;

