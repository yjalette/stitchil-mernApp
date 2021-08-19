import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useSlides from '../../custom_hooks/useSlides'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import SectionNav from '../navbar/SectionNav'

const GigFormWrapper = ({ forms, isDisabled }) => {
    const { currForm } = useParams();
    const { activeIndex, setActiveIndex } = useSlides(
        0, Object.values(forms)
        , { pagination: true });

    useEffect(() => {
        if (currForm) {
            return setActiveIndex(Object.keys(forms)
                .findIndex(k => k === currForm))
        }
    }, [currForm])
    return (
        <SectionWrapper mod_class="itemForm">
            <SectionNav
                items={Object.keys(forms)}
                isDisabled={isDisabled}
                currSection={currForm}
            // nav_class="vertical"
            />
            <BoxWrapper mod_class="itemForm">
                {Object.values(forms)[activeIndex]}
            </BoxWrapper>
        </SectionWrapper>
    )
}





export default GigFormWrapper
