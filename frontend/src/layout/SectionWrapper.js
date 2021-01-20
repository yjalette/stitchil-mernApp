import React from 'react'

const SectionWrapper = ({ children, section_class }) => {
    return (
        <section className={`sectionWrapper sectionWrapper-${section_class}`}>
            {children}
        </section>
    )
}

export default SectionWrapper
