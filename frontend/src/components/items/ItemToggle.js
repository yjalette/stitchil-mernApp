import React from 'react'
import { useToggle } from '../../custom_hooks/useToggle'
import "./style.css"

const ItemToggle = ({ children, initValue, title }) => {
    const [open, toggle] = useToggle(initValue || false);

    return (
        <>
            {open && children}
            <span className="itemToggle">
                {title && <span className="itemToggle__title mr-2">{title}</span>}
                <i className={`fa fa-angle-double-${open ? "left" : "right"} itemToggle__btn mx-2`} onClick={toggle} />
            </span>
        </>
    )
}

export default ItemToggle
