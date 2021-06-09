import React, { useState, memo, useEffect } from 'react'
import { Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

const SectionNav = ({ currSection, items, isDisabled, nav_class, item_props }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();
    const [activeComponent, setActiveComponent] = useState(currSection);

    useEffect(() => {
        if (currSection) return setActiveComponent(currSection)
    }, [currSection])

    const handleClick = e => {
        setActiveComponent(e);
        push(pathname.replace(activeComponent, e));
    }

    return (
        <Nav
            activeKey={activeComponent}
            className={`sectionNav ${nav_class}`}
            onSelect={e => handleClick(e)}>
            {items.map((item, index) => item && <Nav.Link
                key={item}
                eventKey={item}
                value={item}
                className="sectionNav__item"
                disabled={isDisabled && isDisabled(item, index)}
                {...item_props}
            >{item}</Nav.Link>)}
        </Nav>
    )
}

export default memo(SectionNav);

