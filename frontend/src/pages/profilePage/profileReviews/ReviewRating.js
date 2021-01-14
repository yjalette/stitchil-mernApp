import React from 'react'

const ReviewRating = ({ count }) => {
    return (
        <div className="reviewRating flex-center">
            <span className="reviewRating__count mr-2">{count || 0}</span>
            <i className="reviewRating__icon fa fa-star" aria-hidden="true" />
        </div>
    )
}

export default ReviewRating
