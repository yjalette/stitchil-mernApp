import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import SectionWrapper from '../../layout/SectionWrapper'
import GigAddVariant from './GigAddVariant'
import GigEditVariant from './GigEditVariant'
import GigVariantItem from './GigVariantItem'

const GigVariantGrid = ({ variants }) => {
    return (
        <>
            <GigAddVariant />
            <SectionWrapper section_class="gig-variants">
                {variants && variants.length > 0 && variants.map((variant, index) => (
                    <BoxWrapper>
                        <GigVariantItem key={index} variant={variant}>
                            <GigEditVariant variant={variant} />
                        </GigVariantItem>
                    </BoxWrapper>
                ))}
            </SectionWrapper>

        </>
    )
}

export default GigVariantGrid
