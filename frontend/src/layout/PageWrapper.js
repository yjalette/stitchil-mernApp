import React from 'react'

const PageWrapper = ({ children, mod_class }) => (
    <div className={`pageWrapper pageWrapper--${mod_class}`}>
        {children}
    </div>
)

export default PageWrapper
