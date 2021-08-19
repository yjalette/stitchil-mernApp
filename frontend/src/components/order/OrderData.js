import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { ORDER_QUERY } from './graphql/queries'
import OrderContext from '../../context/Order-context'

const OrderData = ({ children }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null)
    const { data, loading } = useQuery(ORDER_QUERY, {
        variables: { orderId }
    })

    useEffect(() => {
        if (data) setOrder(data.order)
    }, [data])


    if (loading || !order) return <div>loading</div>

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderData
