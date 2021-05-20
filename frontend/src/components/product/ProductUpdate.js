import React from 'react'
import ItemDelete from '../items/ItemDelete'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import ProductData from './ProductData'

const ProductUpdate = () => {
    return (
        <>
            <ProductData
                compReceiver={data =>
                    <ItemFormWrapper
                        {...getProps(data)} />}
            />
        </>
    )
}

function getProps(data) {
    return {
        forms: {
            "overview": <ItemOverviewUpdate item={data.item} />,
            "images": <ItemGalleryUpdate prevFiles={data.item && data.item.gallery} />,
            "delete": <ItemDelete group="portfolio" />
        }
    }
}

export default ProductUpdate
