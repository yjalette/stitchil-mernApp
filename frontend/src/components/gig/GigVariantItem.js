import React, { useState, useEffect } from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'
import GigEditVariant from './GigEditVariant';

const GigVariantItem = ({ variant, children }) => {
    const [values, setValues] = useState({});

    useEffect(() => {
        if (values) setValues(variant)
    }, [variant])

    const addNewVariant = newVar => {
        setValues([
            ...values,
            newVar
        ])
    }

    return (
        <div className="gigVariant">
            {Object.keys(variant).map((label, i) => {
                if (["_id", "__typename"].includes(label)) return null
                if (!variant[label] || variant[label].length < 1) return null
                return <ListItem key={i} field={label} content={variant[label]} />
            })}
            {children}
            {/* <GigEditVariant variant={variant} updateVariant={updateVariant} /> */}
        </div>

    )
}

export default GigVariantItem
