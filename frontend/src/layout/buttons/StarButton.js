import React from 'react'

const StarButton = ({ count }) => {
    return (
        <div className="icon-count-wrapper star-btn flex-center">
            <span className="count mr-2">{count}</span>
            <i className={"fa fa-star"} aria-hidden="true" />
        </div>
    )
}

export default StarButton
