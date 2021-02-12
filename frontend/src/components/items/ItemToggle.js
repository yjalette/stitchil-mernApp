import React from 'react'
import { useToggle } from '../../custom_hooks/useToggle'
import "./style.css"

const ItemToggle = ({ children, initValue, title }) => {
    const [open, toggle] = useToggle(initValue || false);

    return (
        <>
            <div className="itemToggle">
                {title && <span className="itemToggle__title mr-2">{title}</span>}
                <i className={`fa fa-${open ? "minus" : "plus"} itemToggle__btn`} onClick={toggle} />
            </div>
            {open && children}
        </>
    )
}

export default ItemToggle
