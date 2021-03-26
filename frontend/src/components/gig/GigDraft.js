import React from 'react'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import GigData from './GigData'
import GigDataVariants from './GigDataVariants'

const GigDraft = () => {
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
        isDisabled: (form_name) => {
            if (form_name !== "overview" && !data.item) return true
            else return false
        },
        forms: {
            "overview": <ItemOverviewUpdate item={data.item} />,
            "images": <ItemGalleryUpdate prevFiles={data.item && data.item.gallery} />,
            "variants": <GigDataVariants />,
            "publish": <GigDataVariants />
        }
    }
}

export default GigDraft
