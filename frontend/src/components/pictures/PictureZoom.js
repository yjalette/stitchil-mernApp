import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useToggle } from '../../custom_hooks/useToggle';

const PictureZoom = ({ elem_class, url }) => {
    const [zoom, toggleZoom] = useToggle(false);
    return (
        <div className={zoom ? "zoom-img__wrapper" : `${elem_class}__wrapper`}>
            <Image src={url} className={zoom ? "zoom-img" : `${elem_class}`} onClick={toggleZoom} />
        </div>
    )
}

export default PictureZoom
