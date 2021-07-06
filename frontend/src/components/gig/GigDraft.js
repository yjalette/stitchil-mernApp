import React from 'react'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import PackageGrid from '../package/PackageGrid'
import GigData from './GigData'
import GigReview from './GigReview'

const GigDraft = () => {
    return (
        <>
            <GigData
                compReceiver={props =>
                    <ItemFormWrapper
                        {...getProps(props)}
                    />}
            />
        </>
    )
}

function getProps({ values, updateQuery }) {
    const { item, packages } = values;
    const forms = {
        "overview": item && <ItemOverviewUpdate item={item} updateQuery={updateQuery} />,
        "images": item && <ItemGalleryUpdate prevFiles={item.gallery} updateQuery={updateQuery} group="gig" />,
        "packages": item && item.gallery && <PackageGrid values={packages} updateQuery={updateQuery} />
    }
    return item && item.active ?
        forms
        :
        {
            forms: {
                ...forms,
                "publish": packages && <GigReview overview={item} images={item.gallery} packages={packages} />
            },
            isDisabled: form_name => {
                if (form_name !== "overview" && !item) return true
                if (form_name === "packages" && item.gallery.length === 0) return true
                if (form_name === "publish" && packages.length === 0) return true
                else return false
            }
        }
}

export default GigDraft
