import React from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem'

const GigVariantItem = ({ variant, children }) => {
    return (
        <div className="gigVariant">
            {Object.keys(variant).map((label, i) => {
                if (["_id", "__typename"].includes(label)) return null
                if (!variant[label] || variant[label].length < 1) return null
                return <ListItem key={i} field={label} content={variant[label]} />
            })}
            {children}
        </div>

    )
}

export default GigVariantItem
