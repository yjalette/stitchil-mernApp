import React, { useState, memo } from 'react'
import { Nav } from 'react-bootstrap';

import { useParams, useHistory, useLocation } from 'react-router-dom';


const PageMenu = ({ links }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();
    const { section } = useParams();
    const [activeComponent, setActiveComponent] = useState(section);

    const handleClick = e => {
        setActiveComponent(e);
        push(pathname.replace(activeComponent, e));
    }

    return (
        <section className="page-menu" >
            <Nav fill variant="tabs" activeKey={activeComponent} className="page-menu__nav" onSelect={e => handleClick(e)}>
                {links.map(link => link && <Nav.Link key={link} eventKey={link} className="page-menu__link">{link}</Nav.Link>)}
            </Nav>
        </section>
    )
}

export default memo(PageMenu);
