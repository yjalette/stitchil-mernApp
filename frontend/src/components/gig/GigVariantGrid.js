import React, { useEffect, useState } from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
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
                    "variants": [newVariant, ...prev.gig.variants]
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
            <GigAddVariant addNewVariant={addNewVariant} />
            <SectionWrapper section_class="gig-variants">
                {values && values.length > 0 && values.map((variant, index) => (
                    <BoxWrapper key={index}>
                        <GigVariantItem variant={variant}>
                            <GigEditVariant variant={variant} index={index} updateCacheVariant={updateCacheVariant} />
                        </GigVariantItem>
                    </BoxWrapper>
                ))}
            </SectionWrapper>

        </>
    )
}

export default GigVariantGrid
