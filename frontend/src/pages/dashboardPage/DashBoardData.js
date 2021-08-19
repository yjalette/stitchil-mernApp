import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DASHBOARD_QUERY } from './graphql/queries'
import OrderListTable from '../../components/order/OrderListTable';

const DashBoardData = () => {
    const { data, loading } = useQuery(DASHBOARD_QUERY);
    const [state, setState] = useState({});

    useEffect(() => {
        if (data) setState(data.dashboard)
    }, [data])

    console.log(data)
    return (
        <div>
            <OrderListTable orders={state.orders} />
        </div>
    )
}

export default DashBoardData
