import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

import ReviewItem from './../../components/message/MessageItem';
import UserAvatar from './../../components/user/UserAvatar';
import EmptyResultAlert from './../../layout/alerts/EmptyResultAlert';
import SectionHeader from './../../layout/SectionHeader';
import ReviewCreate from './../../components/message/MessageCreate';
import { CREATE_REVIEW_MUTATION } from './graphql/mutations';
import AuthContext from './../../context/Auth-context';
import { useToggle } from './../../custom_hooks/useToggle';

const ProfileReviews = ({ values, addItemCache }) => {
    const { user } = useContext(AuthContext);
    const { username } = useParams();
    const [rating, setRating] = useState(0);
    const [open, toggle] = useToggle(true);

    useEffect(() => {
        if (user) {
            setRating(0);
        }
    }, [user]);

    const handleReview = async review => {
        await addItemCache(review);
        toggle();
    }

    return (
        <>
            <SectionHeader title={`reviews (${values.length || 0})`} />
            <div className="reviewGrid">
                {values && values.length > 0 ? values.map((item, index) => (
                    <ReviewItem key={index} item={item} comp_class="reviewItem">
                        <UserAvatar profileImage={item.sender.profileImage} username={item.sender.username} rating="4" />
                    </ReviewItem>
                )) : <EmptyResultAlert type="reviews" />}
            </div>
            {open && <ReviewCreate
                query={CREATE_REVIEW_MUTATION}
                onMessageSent={handleReview}
                otherVariables={{ recipient: username, rating }}>
                <section className="reviewCreate__header">
                    <UserAvatar profileImage={user.profileImage} username={user.username} />
                    <StarRatingComponent
                        name="rating"
                        onStarClick={(val) => setRating(val)}
                    />
                </section>
            </ReviewCreate>}
        </>
    )
}

export default ProfileReviews;
