import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useQueryHook from '../../custom_hooks/useQueryHook';
import ProductGrid from './ProductGrid';
import { VIEW_PRODUCT_QUERY } from './graphql/queries';

const ProductData = () => {
    const { id } = useParams()
    const { data } = useQueryHook(VIEW_PRODUCT_QUERY, { id });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.view_product)
    }, [data])

    if (!data) return <div>loaddd</div>

    return <ProductGrid product={values} />
}

export default ProductData
