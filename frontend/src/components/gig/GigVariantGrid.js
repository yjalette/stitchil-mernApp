import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./style.css"
import SectionWrapper from '../../layout/SectionWrapper'
import GigAddVariant from './GigAddVariant'
import GigEditVariant from './GigEditVariant'
import GigVariantItem from './GigVariantItem'

const GigVariantGrid = ({ variants, updateQuery }) => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (variants) setValues(variants)
    }, [variants])

    const addNewVariant = async newVariant => {
        await updateQuery(prev => {
            return {
                gig: {
                    ...prev.gig,
                    "variants": [
                        newVariant,
                        ...prev.gig.variants
                    ]
                }
            }
        })
    }


    const updateCacheVariant = async (variant, index) => {
        await updateQuery(prev => {
            const newState = [...prev.gig.variants];
            newState.splice(1, index, variant)
            return {
                gig: {
                    ...prev.gig,
                    "variants": newState
                }
            }
        })
    }

    return (
        <>
            <SectionWrapper section_class="gigVariants">
                <GigAddVariant addNewVariant={addNewVariant} />
                <Row>
                    {values && values.length > 0 && values.map((variant, index) => (
                        <Col xl={3} lg={4} sm={12} key={index} className="gigVariant-wrapper">
                            <GigVariantItem variant={variant}>
                                <GigEditVariant
                                    index={index}
                                    variant={variant}
                                    updateCacheVariant={updateCacheVariant} />
                            </GigVariantItem>
                        </Col>
                    ))}
                </Row>
            </SectionWrapper>

        </>
    )
}

export default GigVariantGrid
