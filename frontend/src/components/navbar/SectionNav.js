import React, { useState, memo } from 'react'
import { Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

const SectionNav = ({ currSection, items }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();
    const [activeComponent, setActiveComponent] = useState(currSection);

    const handleClick = e => {
        setActiveComponent(e);
        push(pathname.replace(activeComponent, e));
    }

    return (
        <Nav fill variant="tabs" activeKey={activeComponent} className="sectionNav" onSelect={e => handleClick(e)}>
            {items.map(item => item && <Nav.Link key={item} eventKey={item} className="sectionNav__item">{item}</Nav.Link>)}
        </Nav>
    )
}

export default memo(SectionNav);

