import React from 'react'
import { Nav } from 'react-bootstrap';

const CustomMenu = ({ activeComponent, nav_class, items, handleClick, isDisabled, item_props }) => {
    return (
        <Nav
            activeKey={activeComponent}
            className={`customMenu ${nav_class}`}
            onSelect={e => handleClick(e)}>
            {items.map((item, index) => item && <Nav.Link
                key={item}
                eventKey={item}
                value={item}
                id={item}
                className="customMenu__item"
                disabled={isDisabled && isDisabled(item, index)}
                {...item_props}
            >{item}</Nav.Link>)}
        </Nav>
    )
}

export default CustomMenu
