import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PRODUCT_QUERY } from './graphql/queries'

const ProductData = ({ compReceiver }) => {
    const { itemId } = useParams()
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(PRODUCT_QUERY, {
        variables: { itemId },
        skip: !itemId
    });

    useEffect(() => {
        if (data) setValues(data.product)
    }, [data])


    const result = compReceiver({ values, updateQuery })

    return result
}

export default ProductData
