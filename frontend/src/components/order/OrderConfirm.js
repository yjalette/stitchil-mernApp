import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { CONFIRM_ORDER_MUTATION } from './graphql/mutations'
import OrderData from './OrderData'
import OrderSummary from './OrderSummary'
import OrderContext from '../../context/Order-context'
import CustomButton from '../../layout/button/CustomButton'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import AuthContext from '../../context/Auth-context'
import UserAvatar from '../user/UserAvatar'

const OrderConfirm = () => {
    const { orderId } = useParams();
    const [post] = useMutation(CONFIRM_ORDER_MUTATION, {
        variables: { orderId }
    })


    return (
        <>
            <BoxWrapper>

                <OrderData>
                    <OrderDetails post={post} />
                </OrderData>

            </BoxWrapper>
        </>
    )
}

function OrderDetails({ post }) {
    const { user } = useContext(AuthContext)
    const { order } = useContext(OrderContext);
    return (
        <div>
            <SectionWrapper>
                {order && <OrderSummary
                    {...order}
                />}
            </SectionWrapper>
            {/* {buyer && <Container>
                    <h6>Buyer</h6>
                    <UserAvatar username={buyer.username} rating={8} />
                </Container>}
                {seller && <Container>
                    <h6>Seller</h6>
                    <UserAvatar username={seller.username} rating={8} />
                </Container>} */}
            <SectionWrapper>
                {user.username &&
                    user.username === order.seller.username ?
                    <>
                        <h6>buyer</h6>
                        <UserAvatar username={order.buyer.username} rating={8} />
                        <CustomButton
                            btn_class="btn-click"
                            onClick={() => post()}
                        >accept</CustomButton>
                    </>
                    :
                    <>
                        <h6>seller</h6>
                        <UserAvatar username={order.seller.username} rating={8} />
                    </>
                }
            </SectionWrapper>
        </div>
    )
}

export default OrderConfirm
