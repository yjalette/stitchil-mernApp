import React from 'react'
import { Dropdown } from 'react-bootstrap'

const CustomDropdown = ({ items, btn_class, btn_title, menu_align, menu_class, onClick }) => {
    console.log(items)
    return (
        <Dropdown className={`${menu_class} customDropdown`} drop={menu_align || "down"}>
            <Dropdown.Toggle as="button" className={`customDropdown__btn ${btn_class}`}>{btn_title}</Dropdown.Toggle>
            <Dropdown.Menu className="customDropdown__body">
                {items && items.map((item, i) => <Dropdown.Item
                    key={i}
                    as="button"
                    variant=""
                    value={item.value || item}
                    className={`${item.icon} customDropdown__item`}
                    onClick={onClick}>{!item.icon ? item.title || item : ""}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default CustomDropdown
