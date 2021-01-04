import React from 'react';
import { Container } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const ReviewRate = ({ onRate }) => {
    return (
        <Container className="text-right">
            <StarRatingComponent
                name="rating"
                onStarClick={onRate}
            />
        </Container>
    )
}

export default ReviewRate
