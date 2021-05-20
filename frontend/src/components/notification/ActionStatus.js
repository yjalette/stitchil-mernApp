import React from 'react'
import CustomAlert from '../../layout/CustomAlert'

const ActionStatus = ({ status }) => {
    return (
        <CustomAlert
            alert_variant={status_messages[status].variant}
            alert_class="item_status"
        >
            {status_messages[status].message}
        </CustomAlert>
    )
}

const status_messages = {
    success: {
        message: "Successfully saved", variant: "success"
    },
    error: {
        message: "Error. Please try again", variant: "danger"
    }
}

export default ActionStatus
