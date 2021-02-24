import React, { Component } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import "./style.css";

class CustomPopover extends Component {

    render() {
        const { trigger, placement, title, content, children, popover_class } = this.props;
        return (
            <OverlayTrigger
                trigger={trigger}
                placement={placement}
                overlay={<Popover className={`customPopover ${popover_class}`}>
                    {title && <Popover.Title className="customPopover__title" as="h3">{title}</Popover.Title>}
                    <Popover.Content className="customPopover__content">{content}</Popover.Content>
                </Popover>}>
                {children}
            </OverlayTrigger>
        )
    }
}

CustomPopover.defaultProps = {
    placement: 'right',
    trigger: ["hover", "focus"],
    content: ""
};

export default CustomPopover;


