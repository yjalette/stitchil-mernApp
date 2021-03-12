import React from 'react'

const SectionWrapper = ({ children, section_class }) => {
    return (
        <section className={`sectionWrapper ${section_class}-section`}>
            {children}
        </section>
    )
}

export default SectionWrapper
