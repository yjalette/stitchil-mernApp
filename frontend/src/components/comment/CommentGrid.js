import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap';

import CustomDropdown from '../../layout/CustomDropdown';
import useDeleteData from '../../custom_hooks/useDeleteData'
import UserAvatar from '../../layout/media/UserAvatar'
import MessageItem from '../message/MessageItem'

const CommentGrid = ({ items, children, onDelete }) => {
    const divRef = useRef(null);
    const { deleteItem, data, error } = useDeleteData("deletecomment");

    const handleDelete = (itemId) => {
        deleteItem({ variables: { itemId } });
        onDelete(itemId);
    }

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
                            <CustomDropdown items={[{ title: "delete", onClick: () => handleDelete(item._id) }]} icon="fa fa-ellipsis-v" />
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
