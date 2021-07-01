import React from 'react'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import PackageData from '../package/PackageData'
import GigData from './GigData'
import GigReview from './GigReview'

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
    const { item } = values;
    return {
        isDisabled: (form_name) => {
            if (form_name !== "overview" && !item) return true
            else if (["packages", "publish"].includes(form_name) && item.gallery.length === 0) return true
            else return false
        },
        forms: {
            "overview": item && <ItemOverviewUpdate item={item} updateQuery={updateQuery} />,
            "images": item && <ItemGalleryUpdate prevFiles={item.gallery} updateQuery={updateQuery} group="gig" />,
            "packages": <PackageData />,
            // "variants": <GigVariantGrid variants={variants} updateQuery={updateQuery} />,
            "publish": item && <GigReview overview={item} images={item.gallery} variants={variants} />,
            // "delete": <ItemDelete group="gig" />
        }
    }
}

export default GigDraft
