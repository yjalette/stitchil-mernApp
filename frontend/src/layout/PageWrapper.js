import React from 'react'

const PageWrapper = ({ children, page_class }) => (
    <div className={`pageWrapper ${page_class}-page`}>
        {children}
    </div>
)

export default PageWrapper
