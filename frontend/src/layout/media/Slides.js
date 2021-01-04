import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import UserAvatar from './UserAvatar';

const Slides = ({ items, currentItem, currentIndex, handleClose, children }) => {
    const { username } = useParams();
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    const handleForward = () => setActiveIndex(items.length - 1 === activeIndex ? 0 : activeIndex + 1)

    const handleBackward = () => setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1)

    return (

        <Modal show={true} className="slides-wrapper">
            <div className="slides__header">
                <UserAvatar username={username} />
                <div className="d-flex">
                    {children}
                    {/* <Cancel handleClick={handleClose} /> */}
                </div>
            </div>

            <div className="slides__item  w-100 ">
                <div className="slides__item__wrapper flex-center h-100">
                    {currentItem(activeIndex)}
                </div>
            </div>
            {items && items.length > 1 && <div className="slides__controls">
                <i className="fa fa-angle-left " onClick={handleBackward}></i>
                <i className="fa fa-angle-right " onClick={handleForward}></i>
            </div>}
        </Modal>
    )
}

export default Slides;

