import React from 'react';
import "./style.css"

const BoxWrapper = ({ children, mod_class }) => (
    <div className={`boxWrapper boxWrapper--${mod_class}`}>
        {children}
    </div>
)

export default BoxWrapper
