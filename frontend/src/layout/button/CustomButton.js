import React from 'react';
import "./style.css"

const CustomButton = ({ onClick, btn_class, btn_type, btn_value, btn_name, icon, children }) => (
    <button
        name={btn_name}
        value={btn_value}
        type={btn_type || "click"}
        onClick={onClick}
        className={`customButton ${btn_class} ${icon}`}>
        {children}
    </button>
)

export default CustomButton