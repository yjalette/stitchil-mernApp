import React from 'react'
import { Image } from 'react-bootstrap';

const Thumbnail = ({ imageUrl }) => <Image
    src={imageUrl || "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg"}
    className="thumbnail"
    alt="thumbnail"
    roundedCircle />

export default Thumbnail
