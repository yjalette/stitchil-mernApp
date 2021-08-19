import React from 'react'

const SectionWrapper = ({ children, mod_class }) => {
    return (
        <section className={`sectionWrapper sectionWrapper--${mod_class}`}>
            {children}
        </section>
    )
}

export default SectionWrapper
