import React from 'react'
import { Dropdown } from 'react-bootstrap'

const CustomDropdown = ({ items, btn_class, menu_align, menu_class }) => {
    console.log(items)
    return (
        <Dropdown className={`${menu_class} customDropdown`} drop={menu_align || "down"}>
            <Dropdown.Toggle as="button" className={`customDropdown__btn ${btn_class}`}></Dropdown.Toggle>
            <Dropdown.Menu className="customDropdown__body bg-transparent">
                {items && items.map((item, i) => console.log(item) || <Dropdown.Item
                    key={i}
                    as="button"
                    variant=""
                    className={`${item.item_class} customDropdown__item`}
                    onClick={item.onClick} />)}
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default CustomDropdown
