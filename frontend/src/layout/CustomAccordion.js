import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { useToggle } from '../custom_hooks/useToggle';

const CustomAccordion = ({ items, className }) => (
    <Row className={`section-wrapper ${className}`} >
        {items && items.map(item => (
            <Col key={item.title} xs={12} md={5} className={`${className}__item-wrapper`} >
                <AccordionItem item={item} />
            </Col>
        ))}
    </Row>
)

const AccordionItem = ({ item, className }) => {
    const [open, toggle] = useToggle(false);
    return (
        <div className={`${className}__item`}>
            <h5 className={`${className}__title`} onClick={toggle}>{item.title}</h5>
            {open && <span className={`${className}__text`}>hhhhh{item.text}</span>}
        </div>
    )

}


export default CustomAccordion
