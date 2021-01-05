import React, { useState, memo } from 'react'
import { Nav } from 'react-bootstrap';

import { useParams, useHistory, useLocation } from 'react-router-dom';


const PageMenu = ({ items }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();
    const { section } = useParams();
    const [activeComponent, setActiveComponent] = useState(section);

    const handleClick = e => {
        setActiveComponent(e);
        push(pathname.replace(activeComponent, e));
    }

    return (
        <section className="pageMenu__wrapper w-100" >
            <Nav fill variant="tabs" activeKey={activeComponent} className="pageMenu" onSelect={e => handleClick(e)}>
                {items.map(item => item && <Nav.Link key={item} eventKey={item} className="pageMenu__item">{item}</Nav.Link>)}
            </Nav>
        </section>
    )
}

export default memo(PageMenu);
