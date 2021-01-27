import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ReviewCreate from './ReviewCreate';
import ReviewItem from '../../../components/message/MessageItem';
import UserAvatar from '../../../components/user/UserAvatar';
import ReviewRating from './ReviewRating';
import EmptyResultAlert from '../../../layout/alerts/EmptyResultAlert';
import SectionHeader from '../../../layout/SectionHeader';
import useQueryHook from '../../../custom_hooks/useQueryHook';
import { PROFILE_REVIEWS_QUERY } from '../graphql/queries';
import ProfileContext from '../../../context/Profile-context';

const ReviewData = () => {
    const { logged_in_user } = useContext(ProfileContext)
    const { username } = useParams()
    const { data, getData } = useQueryHook(PROFILE_REVIEWS_QUERY, { variables: { username } })
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (data) setValues(data.profile_reviews)
    }, [data]);

    const handleAddReview = newReview => {
        setValues([
            newReview,
            ...values
        ])
    }
    return (
        <>
            <SectionHeader title={`reviews (${values.length})`} />
            <div className="reviewGrid">
                {values && values.length > 0 ? values.map((item, index) => (
                    <ReviewItem key={index} item={item} comp_class="reviewItem">
                        <Container className="reviewItem__header">
                            <UserAvatar profileImage={item.sender.profileImage} username={item.sender.username} />
                            <ReviewRating count={item.rating} />
                        </Container>
                    </ReviewItem>
                )) : <EmptyResultAlert type="reviews" />}
            </div>
            {!logged_in_user && <ReviewCreate addComment={handleAddReview} />}
        </>
    )
}

export default ReviewData;
