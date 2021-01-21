import React from 'react'
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert'
import OverlayCard from '../../layout/card/OverlayCard'
import "./style.css"

const ItemList = ({ items, getProps, emptyResultType }) => {

    if (!items || items.length < 1) return <EmptyResultAlert type={emptyResultType || "results"} includeText={emptyResultType && true} />

    return (
        <div className="itemList">
            {items.map((item, index) => <OverlayCard key={index} card_props={{ ...getProps(item, index), class: "itemSum" }} />)}
        </div>
    )
}
export default ItemList
