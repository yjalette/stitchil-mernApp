import React from 'react'

const SectionHeader = ({ title, children }) => {
    return (
        <div className="sectionHeader flex-center">
            <h3 className="sectionHeader__title gradient-text">{title}</h3>
            {children}
            {/* {logged_in_user && <IconButton icon_class={icon_class} onClick={onClick} />} */}
        </div>
    )
}

export default SectionHeader