import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';

import "./style.css";
import CommentGrid from './CommentGrid';
import CommentCreate from './CommentCreate';
import { COMMENTS_QUERY } from './graphql/queries';

const CommentData = ({ docId }) => {
    const [getData, { data }] = useLazyQuery(COMMENTS_QUERY);
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (docId && getData) getData({ variables: { docId } })
    }, [docId, getData]);

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
