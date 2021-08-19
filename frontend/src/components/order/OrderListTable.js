import React from 'react'
import { Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import dateHelper from '../../helpers/dateHelper'
import BoxWrapper from '../../layout/BoxWrapper'

const OrderListTable = ({ orders }) => {
    const { push } = useHistory()
    return (
        <div>
            <BoxWrapper mod_class="orderListTable">
                <Table striped borderless hover responsive="md" size="sm" variant="dark" className="orderListTable">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 && orders.map((order, i) => {
                            return (
                                <tr key={order._id}>
                                    <td
                                        className="clickElem"
                                        onClick={() => push(`/order/${order.orderStatus}/${order._id}/`)}>{order.item.title}</td>
                                    {/* <td
                                        className="clickElem"
                                        onClick={() => push(`/profile/${order.buyer.username}/gigs`)}
                                    >@{order.buyer.username}</td> */}
                                    <td>{order.orderStatus}</td>
                                    <td>{dateHelper(order.createdAt)}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </BoxWrapper>
        </div>
    )
}

export default OrderListTable
