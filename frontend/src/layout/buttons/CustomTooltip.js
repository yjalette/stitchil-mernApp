import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomTooltip = ({ position, tooltip, children }) => (
    <OverlayTrigger
        overlay={
            <Tooltip id={`tooltip-${position}`}>
                {tooltip}
            </Tooltip>
        }
    >
        {children}
    </OverlayTrigger>
)

export default CustomTooltip


