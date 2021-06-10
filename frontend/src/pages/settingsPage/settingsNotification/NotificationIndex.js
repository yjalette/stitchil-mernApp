import React from 'react'
import CustomAlert from '../../../layout/CustomAlert'
import messages from '../../../constants/messages'

const NotificationIndex = () => <CustomAlert alert_variant="warning">
    {messages.demo}
</CustomAlert>

export default NotificationIndex
