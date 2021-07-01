import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import useSlides from '../../custom_hooks/useSlides'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import SectionNav from '../navbar/SectionNav'

const ItemFormWrapper = ({ forms, isDisabled }) => {
    const { currForm } = useParams();
    const { activeSlide, setActiveIndex } = useSlides(
        0, Object.values(forms)
        , { pagination: true });

    useEffect(() => {
        if (currForm) {
            return setActiveIndex(Object.keys(forms)
                .findIndex(k => k === currForm))
        }
    }, [currForm])

    return (
        <SectionWrapper section_class="itemForm">
            <SectionNav
                items={Object.keys(forms)}
                isDisabled={isDisabled}
                currSection={currForm}
            // nav_class="vertical"
            />
            <BoxWrapper box_class="itemForm">
                {activeSlide}
            </BoxWrapper>
        </SectionWrapper>
    )
}

export default ItemFormWrapper
