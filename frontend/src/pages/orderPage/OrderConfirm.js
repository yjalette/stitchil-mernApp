import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { CONFIRM_ORDER_MUTATION } from './graphql/mutations'
import OrderContext from '../../context/Order-context'
import CustomButton from '../../layout/button/CustomButton'
import OrderData from './OrderData'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import OrderSummary from '../../components/order/OrderSummary'

const OrderConfirm = () => {
    const { orderId } = useParams()
    const [post] = useMutation(CONFIRM_ORDER_MUTATION, {
        variables: { orderId }
    })

    return (
        <>
            <SectionWrapper>
                <BoxWrapper>
                    <OrderData>
                        <OrderDetails />
                    </OrderData>
                </BoxWrapper>
            </SectionWrapper>
            <SectionWrapper>
                <CustomButton
                    btn_class="btn-click"
                    onClick={() => post()}
                >accept</CustomButton>
            </SectionWrapper>
        </>
    )
}

function OrderDetails() {
    const { order } = useContext(OrderContext);

    return (
        <div>
            {order && <OrderSummary
                {...order}
            />}
        </div>
    )
}

export default OrderConfirm
