import React from 'react'
import ItemFormUpload from '../items/ItemFormUpload'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemOverviewCreate from '../items/ItemOverviewCreate'

const ProductDraft = () => {
    return (
        <ItemFormWrapper form_steps={
            {
                "overview": <ItemOverviewCreate group="portfolio" />,
                "gallery": <ItemFormUpload action="create" />
            }
        } />
    )
}

export default ProductDraft
