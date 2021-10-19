import React from 'react'

const SectionHeader = ({ title, children }) => (
    <div className="sectionHeader">
        <h4 className="sectionHeader__title title">{title}</h4>
        {children}
    </div>
)

export default SectionHeader