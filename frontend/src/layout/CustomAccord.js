import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const CustomAccord = ({ item, eventKey, mod__class }) => {
    return (
        <Accordion
            className={`customAccord customAccord--${mod__class}`}
            defaultActiveKey="1">
            <Accordion.Toggle
                as="h4"
                className="btn-text customAccord__title"
                eventKey={eventKey.toString()}>
                {item.title}
            </Accordion.Toggle>
            <Accordion.Collapse
                className="customAccord__body"
                eventKey={eventKey.toString()}>
                {item.body}
            </Accordion.Collapse>
        </Accordion>
    )
}



export default CustomAccord
