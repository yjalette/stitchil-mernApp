import React, { useContext } from 'react'
import GigContext from '../../context/Gig-context'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import PackageFormWrapper from '../package/PackageFormWrapper'
import ShippingGrid from '../shipping/ShippingGrid'
import GigData from './GigData'
import GigFormWrapper from './GigFormWrapper'

const GigDraft = () => {
    return (
        <>
            <GigData>
                <GigWrapper />
            </GigData>
        </>
    )
}

function GigWrapper() {
    const { gig, updateQuery } = useContext(GigContext);
    const { item, packages, shipping_options } = gig;
    const isDisabled = form_name => {
        if (form_name !== "overview" && !item) return true
        if (form_name === "packages" && item.gallery.length === 0) return true
        if (form_name === "shipping" && packages.length === 0) return true
        if (form_name === "publish" && shipping_options.length === 0) return true
        else return false
    }

    if (!gig || !item) return <div></div>
    return (
        <GigFormWrapper forms={{
            "overview": <ItemOverviewUpdate item={item} updateQuery={updateQuery} />,
            "images": <ItemGalleryUpdate prevFiles={item.gallery} updateQuery={updateQuery} group="gig" />,
            "packages": item.gallery && <PackageFormWrapper packages={packages} updateQuery={updateQuery} />,
            "shipping": item.gallery && <ShippingGrid shipping_options={shipping_options} updateQuery={updateQuery} />
        }}
            isDisabled={isDisabled}

        />
    )
}


export default GigDraft
