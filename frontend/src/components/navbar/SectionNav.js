import React, { useState, memo, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CustomMenu from '../../layout/CustomMenu';

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

    return <CustomMenu
        activeComponent={activeComponent}
        item_props={item_props}
        items={items}
        isDisabled={isDisabled}
        nav_class={nav_class}
        handleClick={handleClick} />
}

export default memo(SectionNav);

