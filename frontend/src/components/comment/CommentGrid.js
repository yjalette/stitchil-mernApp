import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import UserAvatar from '../user/UserAvatar'
import MessageItem from '../message/MessageItem'
import { DELETE_COMMENT_MUTATION } from './graphql/mutations';

const CommentGrid = ({ items, children, onDelete }) => {
    const divRef = useRef(null);
    const [post] = useMutation(DELETE_COMMENT_MUTATION);

    // const handleDelete = (itemId) => {
    //     post({ variables: { itemId } });
    //     onDelete(itemId);
    // }

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <div className="commentGrid">
            <h3>comments ({items.length})</h3>
            <div className="commentGrid__list">
                {items && items.length > 0 && items.map((item, index) => (
                    <MessageItem key={index} item={item} comp_class="commentItem">
                        <Container className="commentItem__header">
                            <UserAvatar profileImage={item.sender.profileImage} username={item.sender.username} />
                            {/* <CustomDropdown items={[{ title: "delete", onClick: () => handleDelete(item._id) }]} icon="fa fa-ellipsis-v" /> */}
                        </Container>
                    </MessageItem>
                ))}
                <div ref={divRef}></div>
            </div>
            {children}
        </div>
    )
}

export default CommentGrid
