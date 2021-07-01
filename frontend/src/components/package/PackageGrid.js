import React from 'react'
import { Col, Row } from 'react-bootstrap'
import useSlides from '../../custom_hooks/useSlides'
import CustomMenu from '../../layout/CustomMenu'
import SectionWrapper from '../../layout/SectionWrapper'
import PackageCreate from './PackageCreate'
import PackageUpdate from './PackageUpdate'
import "./style.css"

const PackageGrid = ({ values, updateCache, addNewPackageCache }) => {
    const forms = ["basic", "standard", "premium"]
    const { activeSlide, setActiveIndex, activeIndex } = useSlides(
        0, forms
        , { pagination: true });

    const handleSlide = package_type => {
        const index = forms.findIndex(form => form === package_type);
        setActiveIndex(index)
    }

    return (
        <>
            <SectionWrapper section_class="gigVariants">
                <Row className="w-100">
                    <Col xl={3} sm={3}>
                        <CustomMenu
                            items={forms}
                            handleClick={handleSlide}
                            activeComponent={forms[activeIndex]}
                            nav_class="vertical"
                        />
                    </Col>
                    <Col xl={9} sm={9}>
                        {values && values.length > 0 && values.find(val => console.log(val) || val.type === activeSlide)
                            ?
                            <PackageUpdate item={values[activeIndex]} updateCache={updateCache} />
                            :
                            <PackageCreate type={activeSlide} addNewPackageCache={addNewPackageCache} />}
                    </Col>
                </Row>
            </SectionWrapper>
        </>
    )
}

export default PackageGrid
