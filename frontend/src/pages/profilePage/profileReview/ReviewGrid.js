import React from 'react';
import { Container } from 'react-bootstrap';

import ReviewItem from '../../../components/message/MessageItem';
import UserAvatar from '../../../components/user/UserAvatar';
import ReviewRating from './ReviewRating';
import EmptyResultAlert from '../../../layout/alerts/EmptyResultAlert';
import SectionHeader from '../../../layout/SectionHeader';
import ReviewCreate from '../../../components/message/MessageCreate';
import { CREATE_REVIEW_MUTATION } from '../graphql/mutations';
import { useParams } from 'react-router-dom';

const ReviewGrid = ({ values, addItemCache }) => {
    const { username } = useParams()
    return (
        <>
            <SectionHeader title={`reviews (${values.length || 0})`} />
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
            <ReviewCreate query={CREATE_REVIEW_MUTATION} addMessage={addItemCache} otherVariables={{ recipient: username }} />
        </>
    )
}

export default ReviewGrid;
