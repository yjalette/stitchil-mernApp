import React from 'react';
import { Dropdown } from 'react-bootstrap'

const IconMenu = ({ items, menu_btn, menu_align, item_class, onToggle }) => {
    console.log(items)
    return (
        <Dropdown className="iconMenu bg-transparent" onToggle={(el) => console.log(el)} drop={menu_align || "left"}>
            <Dropdown.Toggle as="button" className={`${menu_btn} iconMenu__btn `} />
            <Dropdown.Menu className="bg-transparent iconMenu__body">
                {items && items.map((item, i) => <Dropdown.Item
                    key={i}
                    as="button"
                    variant=""
                    className={`${item_class} ${item.icon} iconMenu__item`}
                    onClick={item.onClick} />)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default IconMenu

{/* <i className={`${item.icon}`} />tuttt */ }

// bg-transparent