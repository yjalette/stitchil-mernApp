import React from 'react';
import "./style.css"

const CustomButton = ({ onClick, btn_class, icon, btn_otherProps, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`customButton ${btn_class} ${icon}`}
        {...btn_otherProps}>
        {children}
    </button>
)

export default CustomButton

