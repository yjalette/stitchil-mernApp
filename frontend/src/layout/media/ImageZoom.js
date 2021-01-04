import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useToggle } from '../../custom_hooks/useToggle'

const ImageZoom = ({ img_class, img_src }) => {
    const [zoom, toggleZoom] = useToggle(false);
    const [zoomPic, setZoomPic] = useState(null)
    const imageRef = useRef(null);

    // useEffect(() => {
    //     if (img_src) setZoomPic(img_src)
    // }, [img_src])

    console.log(img_src)

    return (
        <div className={zoom ? "zoomImage__wrapper" : `${img_class}__wrapper`}>
            <Image src={img_src} className={zoom ? "zoomImage" : `${img_class}`} onClick={toggleZoom} />
        </div>
    )
}

export default ImageZoom
