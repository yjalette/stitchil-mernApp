import React from 'react';
import "./style.css"

const BoxWrapper = ({ children, box_class }) => (
    <div className={`boxWrapper ${box_class}`}>
        {children}
    </div>
)

export default BoxWrapper
