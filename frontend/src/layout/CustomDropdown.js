import React from 'react'
import { Dropdown } from 'react-bootstrap'

const CustomDropdown = ({ items, btn_class, btn_title, menu_align, menu_drop, menu_class, dropdown_item }) => {
    return (
        <Dropdown className={`${menu_class} customDropdown`} drop={menu_drop || "down"}>
            <Dropdown.Toggle as="button" className={`customDropdown__btn ${btn_class}`}>{btn_title}</Dropdown.Toggle>
            <Dropdown.Menu className="customDropdown__body" align={menu_align || "left"}>
                {items && items.length > 0 && items.map((item, i) => dropdown_item(item, i))}
            </Dropdown.Menu>
        </Dropdown >

    )
}

export default CustomDropdown

