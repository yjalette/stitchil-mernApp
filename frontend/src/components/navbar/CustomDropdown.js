import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({ btn_title, items, handleClick, className }) => {
    return (
        <Dropdown className="customDropdown">
            <Dropdown.Toggle variant="" className={`customDropdown__btn ${className}`}>{btn_title}</Dropdown.Toggle>
            <Dropdown.Menu className="customDropdown__menu">
                {items.map((item, index) => <Dropdown.Item
                    as="button"
                    key={index}
                    eventKey={btn_title}
                    value={item}
                    className="customDropdown__item"
                    onClick={() => handleClick({ name: btn_title, value: item })}>{item}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown
