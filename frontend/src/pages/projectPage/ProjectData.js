import React from 'react'
import { useParams } from 'react-router-dom'
import ChatData from '../../components/chat/ChatData'
import ChatSendMessage from '../../components/chat/ChatSendMessage'
import OrderData from '../../components/order/OrderData'
import ProjectGrid from './ProjectGrid'

const ProjectData = () => {
    const { orderId } = useParams();
    return (
        <div>
            <OrderData>
                <ProjectGrid />
            </OrderData>
            <ChatData chatId={orderId}>
                <ChatSendMessage />
            </ChatData>
            {/* <MessageSendForm /> */}
        </div>
    )
}

export default ProjectData
