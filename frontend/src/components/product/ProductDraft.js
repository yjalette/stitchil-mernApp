import React from 'react'
import ItemDelete from '../items/ItemDelete'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemGalleryUpdate from '../items/ItemGalleryUpdate'
import ItemOverviewUpdate from '../items/ItemOverviewUpdate'
import ProductData from './ProductData'

const ProductDraft = () => {
    return (
        <>
            {/* <ItemFormWrapper
                {...getProps(props)} /> */}
            <ProductData
                compReceiver={props =>
                    <ItemFormWrapper
                        {...getProps(props)} />}
            />
        </>
    )
}

function getProps({ values, updateQuery }) {
    const { item } = values;
    console.log(values)
    return {
        isDisabled: (form_name) => {
            if (form_name !== "overview" && !item) return true
            else if (["publish"].includes(form_name) && item.gallery.length < 1) return true
            else return false
        },
        forms: {
            "overview": <ItemOverviewUpdate item={item && item} updateQuery={updateQuery} />,
            "images": <ItemGalleryUpdate prevFiles={item && item.gallery} updateQuery={updateQuery} />,
            "delete": <ItemDelete group="gigs" />
        }
    }
}

export default ProductDraft
