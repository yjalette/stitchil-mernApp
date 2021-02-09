import React from 'react'
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert'
import ItemSum from './ItemSum'
import "./style.css"

const ItemList = ({ items, getProps, emptyResultType }) => {
    if (!items || items.length < 1) return <EmptyResultAlert type={emptyResultType || "results"} includeText={emptyResultType && true} />
    return (
        <div className="itemList">
            {items.map((item, index) => <ItemSum key={index} {...getProps(item, index)} />)}
        </div>
    )
}
export default ItemList
