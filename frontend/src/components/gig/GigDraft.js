import React from 'react'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import GigData from './GigData'
import GigPublish from './GigPublish'
import GigVariantGrid from './GigVariantGrid'

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
    const { item, variants } = data;
    return {
        isDisabled: (form_name) => {
            if (form_name !== "overview" && !item) return true
            else return false
        },
        forms: {
            "overview": <ItemOverviewUpdate item={item} />,
            "images": <ItemGalleryUpdate prevFiles={item && item.gallery} />,
            "variants": <GigVariantGrid variants={variants} />,
            "publish": item && <GigPublish overview={item} images={item.gallery} variants={variants} />
        }
    }
}

export default GigDraft
