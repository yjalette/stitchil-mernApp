import React from 'react'

const PageWrapper = ({ children, page_class }) => (
    <div className={`pageWrapper pageWrapper-${page_class}`}>
        {children}
    </div>
)

export default PageWrapper
