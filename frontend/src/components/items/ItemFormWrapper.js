import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router'
import useSlides from '../../custom_hooks/useSlides'
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
        <SectionWrapper>
            <Row className="itemFormWrapper w-100">
                <Col xl={2} lg={4} md={5} className="itemFormWrapper-col">
                    <SectionNav
                        items={Object.keys(forms)}
                        isDisabled={isDisabled}
                        currSection={currForm}
                        nav_class="vertical"
                    />
                </Col>
                <Col xl={10} lg={8} md={7} className="itemFormWrapper-col">
                    {activeSlide}
                </Col>
            </Row>
        </SectionWrapper>
    )
}

export default ItemFormWrapper
