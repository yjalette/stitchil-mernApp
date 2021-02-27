import React from 'react'
import { Dropdown } from 'react-bootstrap'

const CustomDropdown = ({ items, btn_name, btn_class, btn_title, menu_align, menu_class, onClick }) => {

    return (
        <Dropdown className={`${menu_class} customDropdown`} drop={menu_align || "down"}>
            <Dropdown.Toggle as="button" className={`customDropdown__btn ${btn_class}`}>{btn_title}</Dropdown.Toggle>
            <Dropdown.Menu className="customDropdown__body">
                {items && items.length > 0 && items.map((item, i) => <Dropdown.Item
                    key={i}
                    as="button"
                    variant=""
                    name={btn_name || btn_title}
                    value={item}
                    className={`customDropdown__item`}
                    onClick={onClick}>{item}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown >

    )
}

export default CustomDropdown
