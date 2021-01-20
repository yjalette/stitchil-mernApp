import React, { useEffect, useState } from 'react'

const PaginationIndex = ({ count, activePage, onClick }) => {
    return (
        <div className="pagination w-100 flex-center justify-content-end">
            {[...Array(count).keys()].map((page, index) => console.log(activePage, index) || <button
                key={index}
                className={`${Number(activePage) === index && "clickElem-active"} clickElem`}
                index={index}
                value={index}
                onClick={onClick}>{index + 1}</button>)}
        </div>
    )
}

export default PaginationIndex
