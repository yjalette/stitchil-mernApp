import React from 'react'

const ItemList = ({ items, showItem }) => {
    return (
        <div className="itemList">
            {items && items.length > 0 && items.map((item, i) => <span key={i} className="">{showItem(item)}</span>)}
        </div>
    )
}

export default ItemList
