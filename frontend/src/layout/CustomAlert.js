import React from 'react'
import { Alert } from 'react-bootstrap'

const CustomAlert = ({ alert_variant, alert_heading, children, alert_footer, alert_class }) => {
    return (
        <Alert variant={alert_variant || "success"} className={`customAlert ${alert_class}`}>
            {alert_heading && <Alert.Heading>{alert_heading}</Alert.Heading>}
            <p className="customAlert__content">
                {children}
            </p>
            {alert_footer && <>
                <hr />
                <p className="customAlert__footer">
                    {alert_footer}
                </p>
            </>}
        </Alert>
    )
}

export default CustomAlert
