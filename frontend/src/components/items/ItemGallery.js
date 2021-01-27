import React from 'react'
import PictureZoom from '../pictures/PictureZoom'

const ItemGallery = ({ items }) => {
    console.log(items)
    return (
        <div className="itemGallery">
            <PictureZoom imageUrl={items[0]} elem_class="itemGallery__activeImg" />
        </div>
    )
}

export default ItemGallery
