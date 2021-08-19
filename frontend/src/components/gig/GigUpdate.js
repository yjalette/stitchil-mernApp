import React from 'react'
import ItemDelete from '../items/ItemDelete'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
// import PackageGrid from '../package/PackageGrid'
import GigData from './GigData'

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
            // "packages": <PackageGrid values={data.packages} />,
            "delete": <ItemDelete group="gigs" />
        }
    }
}

export default GigUpdate
