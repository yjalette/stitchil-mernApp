import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import "./style.css";
import ProfileContext from '../../context/Profile-context';
import ReviewData from './ReviewsData';

const ReviewIndex = () => {
    const { logged_in_user } = useContext(ProfileContext)
    const { username } = useParams()

    return (
        <div className="reviews">
            <ReviewData username={username} logged_in_user={logged_in_user} />
        </div>
    )
}

export default ReviewIndex;
