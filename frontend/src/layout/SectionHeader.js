import React from 'react'

const SectionHeader = ({ title, children }) => (
    <div className="sectionHeader">
        <h3 className="sectionHeader__title title">{title}</h3>
        {children}
    </div>
)

export default SectionHeader