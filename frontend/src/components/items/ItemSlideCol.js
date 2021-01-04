import React from 'react'

const ItemSlideCol = ({ col_class, children }) => {
    return (
        <div className={`${col_class} slides__col`}>
            {children}
        </div>
    )
}

export default ItemSlideCol
