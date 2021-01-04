import React, { useEffect, useState } from 'react'

import "./style.css";
import useGetData from '../../custom_hooks/useGetData';
import CommentGrid from './CommentGrid';
import CommentCreate from './CommentCreate';

const CommentData = ({ docId }) => {
    const { data, getData } = useGetData("comments");
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (docId) getData({ variables: { docId } })
    }, [docId]);

    useEffect(() => {
        if (data) setValues(data.comments)
    }, [data]);

    const handleNewComment = newComment => {
        setValues([
            newComment,
            ...values
        ])
    }

    const handleDelete = commentId => {
        setValues(values.filter(value => value._id !== commentId))
    }

    return (
        <CommentGrid items={values} onDelete={handleDelete}>
            <CommentCreate docId={docId} addComment={handleNewComment} />
        </CommentGrid>
    )
}

export default CommentData
