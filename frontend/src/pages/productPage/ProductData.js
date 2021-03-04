import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ProductGrid from './ProductGrid';
import { VIEW_PORTFOLIO_ITEM_QUERY } from './graphql/queries';

const ProductData = () => {
    const { id } = useParams()
    const { data } = useQuery(VIEW_PORTFOLIO_ITEM_QUERY, { id });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.view_portfolio_item)
    }, [data])

    if (!data) return <div>loaddd</div>

    return <ProductGrid product={values} />
}

export default ProductData
