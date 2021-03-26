import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import SectionWrapper from '../../layout/SectionWrapper'
import GigAddVariant from './GigAddVariant'
import GigFormVariant from './GigFormVariant'
import GigEditVariant from './GigEditVariant'
import { GIG_VARIANTS_QUERY } from './graphql/queries'

const GigDataVariants = () => {
    const [variants, setVariants] = useState([])
    const { itemId } = useParams()
    const { data } = useQuery(GIG_VARIANTS_QUERY, {
        variables: { itemId },
        skip: !itemId
    });

    useEffect(() => {
        if (data) setVariants(data.gig_variants)
    }, [data])

    return (
        <>
            <GigAddVariant itemId={itemId} />
            {variants.length > 0 && variants.map((variant, index) => {
                console.log(Object.values(variant))
                return (
                    <BoxWrapper key={index}>
                        {Object.keys(variant).map((label, i) => {
                            if (["_id", "__typename"].includes(label)) return null
                            return <ListItem key={i} field={label} content={variant[label]} />
                        })}
                        <GigEditVariant itemId={itemId} variant={variant} />
                    </BoxWrapper>
                )
            })}
        </>
    )
}

export default GigDataVariants
