import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import ProfileSectionTitle from '../../pages/profilePage/ProfileSectionTitle';
import ReviewCreate from './ReviewCreate';
import ReviewItem from '../message/MessageItem';
import UserAvatar from '../../layout/media/UserAvatar';
import ReviewRating from './ReviewRating';
import useGetData from '../../custom_hooks/useGetData';
import EmptyResultAlert from '../../layout/alerts/EmptyResultAlert';

const ReviewData = ({ username, logged_in_user }) => {
    const { data, getData } = useGetData("profilereviews")
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (username) getData({ variables: { username } })
    }, [username]);

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
            <ProfileSectionTitle title={`reviews (${values.length})`} />
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
