import React from 'react'
import { useParams } from 'react-router'

import ItemFormUpload from '../items/ItemFormUpload'
import ItemFormWrapper from '../items/ItemFormWrapper'
import ItemOverviewCreate from '../items/ItemOverviewCreate'

const ProductCreate = () => {
    return (
        <ItemFormWrapper form_steps={
            {
                "overview": <ItemOverviewCreate group="portfolio" />,
                "gallery": <ItemFormUpload action="create" />
            }
        } />
    )
}

export default ProductCreate
