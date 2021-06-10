import React from 'react'
import ItemDelete from '../items/ItemDelete'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import GigData from './GigData'
import GigReview from './GigReview'
import GigVariantGrid from './GigVariantGrid'

const GigDraft = () => {
    return (
        <>
            {/* <ItemFormWrapper
                {...getProps(props)} /> */}
            <GigData
                compReceiver={props =>
                    <ItemFormWrapper
                        {...getProps(props)} />}
            />
        </>
    )
}


function getProps({ values, updateQuery }) {
    const { item, variants } = values;
    return {
        isDisabled: (form_name) => {
            if (form_name !== "overview" && !item) return true
            else if (["variants", "publish"].includes(form_name) && item.gallery.length < 1) return true
            else return false
        },
        forms: {
            "overview": item && <ItemOverviewUpdate item={item} updateQuery={updateQuery} />,
            "images": item && <ItemGalleryUpdate prevFiles={item.gallery} updateQuery={updateQuery} group="gig" />,
            "variants": <GigVariantGrid variants={variants} updateQuery={updateQuery} />,
            "publish": item && <GigReview overview={item} images={item.gallery} variants={variants} />,
            "delete": <ItemDelete group="gig" />
        }
    }
}

export default GigDraft
