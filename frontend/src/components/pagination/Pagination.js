import React, { useEffect, useState } from 'react'

const Pagination = ({ count, activePage, onClick }) => {
    return (
        <div className="pagination flex-center">
            {[...Array(count).keys()].map((page, index) => <button
                key={index}
                className={`${Number(activePage) === index && "clickElem-active"} clickElem`}
                index={index}
                value={index}
                onClick={onClick}>{index + 1}</button>)}
        </div>
    )
}

export default Pagination
