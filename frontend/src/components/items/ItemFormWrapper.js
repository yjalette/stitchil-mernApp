import React from 'react'
import { Nav, Row, Col } from 'react-bootstrap'
import useSlides from '../../custom_hooks/useSlides'
import CustomButton from '../../layout/button/CustomButton'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'


const ItemFormWrapper = ({ forms, isDisabled }) => {
    const { activeSlide, setActiveIndex, activeIndex } = useSlides(
        0, Object.values(forms)
        , { pagination: true });

    // const handleClick = ({ target }) => {
    //     const { name, value } = target;
    //     // checking if its disabled
    //     return setActiveIndex(value)
    // }
    return (
        <SectionWrapper>
            <Row className="itemFormWrapper w-100">
                <Col xl={2} lg={4} md={5} className="itemFormWrapper-col">
                    <Nav className="itemFormWrapper__nav">
                        {Object.keys(forms).map((form_name, index) => {
                            return (
                                <CustomButton
                                    key={index}
                                    btn_class={`btn-click ${activeIndex === index && "active"} `}
                                    onClick={() => setActiveIndex(index)}
                                    btn_otherProps={{
                                        name: form_name,
                                        value: index,
                                        disabled: isDisabled && isDisabled(form_name, index)
                                    }}
                                >{form_name}</CustomButton>
                            )
                        })}
                    </Nav>
                </Col>
                <Col xl={10} lg={8} md={7} className="itemFormWrapper-col">
                    <SectionHeader title={[Object.keys(forms)[activeIndex]]} />
                    {activeSlide}
                </Col>
            </Row>
        </SectionWrapper>
    )
}

export default ItemFormWrapper
