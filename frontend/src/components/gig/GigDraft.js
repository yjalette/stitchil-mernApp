import React from 'react'
import { useLocation } from 'react-router'
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
            "overview": <ItemOverviewUpdate item={item && item} updateQuery={updateQuery} />,
            "images": <ItemGalleryUpdate prevFiles={item && item.gallery} updateQuery={updateQuery} />,
            "variants": <GigVariantGrid variants={variants} updateQuery={updateQuery} />,
            "publish": <GigReview overview={item && item} images={item && item.gallery} variants={variants} />,
            "delete": <ItemDelete group="gigs" />
        }
    }
}

export default GigDraft
