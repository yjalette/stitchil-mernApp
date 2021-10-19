import React from 'react'
import { useParams } from 'react-router-dom'
import MessageListData from '../../components/message/MessageListData'
import MessageSend from '../../components/message/MessageSend'
import OrderData from '../../components/order/OrderData'
import ProjectGrid from './ProjectGrid'

const ProjectData = () => {
    const { orderId } = useParams();
    return (
        <div>
            <OrderData>
                <ProjectGrid />
            </OrderData>
            <MessageListData chatId={orderId}>
                <MessageSend chatId={orderId} />
            </MessageListData>
        </div>
    )
}

export default ProjectData
