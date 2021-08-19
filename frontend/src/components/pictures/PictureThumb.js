import React from 'react'
import { Image } from 'react-bootstrap';
import "./style.css"

const PictureThumb = ({ url }) => <Image
    src={url || "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg"}
    className="thumb"
    alt="thumbnail"
    roundedCircle />

export default PictureThumb