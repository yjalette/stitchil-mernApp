import React from 'react'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import GigData from './GigData'
import GigDataVariants from './GigDataVariants'

const GigUpdate = () => {
    return (
        <>
            <GigData
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
            "variants": <GigDataVariants />,
            "delete": <GigDataVariants />
        }
    }
}

export default GigUpdate
