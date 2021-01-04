import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

class CustomOverlay extends Component {
    render() {
        const { trigger, placement, content, children } = this.props;
        return (
            <OverlayTrigger
                trigger={trigger}
                placement={placement}
                overlay={<Tooltip id="tooltip" className="customTooltip"><strong>{content}</strong></Tooltip>}>
                <span>{children}</span>
            </OverlayTrigger>
        )
    }
}

CustomOverlay.defaultProps = {
    placement: 'right',
    trigger: ["hover", "focus"],
    content: ""
};

export default CustomOverlay;


