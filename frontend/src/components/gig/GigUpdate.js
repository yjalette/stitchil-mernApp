import React from 'react'
import ItemDelete from '../items/ItemDelete'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import GigData from './GigData'
import GigVariantGrid from './GigVariantGrid'

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
            "variants": <GigVariantGrid variants={data && data.item && data.item.variants} />,
            "delete": <ItemDelete group="gigs" />
        }
    }
}

export default GigUpdate
