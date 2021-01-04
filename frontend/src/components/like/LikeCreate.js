import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import AuthContext from '../../context/Auth-context';
import usePostData from '../../custom_hooks/usePostData';
import IconButton from '../../layout/buttons/IconButton';
import useGetData from '../../custom_hooks/useGetData';

const LikeCreate = ({ docId }) => {
    const { section } = useParams();
    const { user } = useContext(AuthContext)
    const [likes, setLikes] = useState([]);
    const { data, fetchData } = useGetData("likes");
    const { post } = usePostData("postlike", onPostCompleted);

    useEffect(() => {
        if (data) setLikes(data.likes);
        else fetchData({ variables: { docId, docName: section } });
    }, [data])

    // console.log(likes.includes(user.username))
    function toggleLike() {
        if (likes.includes(user.username)) console.log("here") || setLikes(likes.filter(like => like !== user.username))
        else console.log(likes) || setLikes([...likes, user.username]);
        post({ variables: { docId, docName: section } })
    }

    function onPostCompleted() {
        fetchData();
    }

    return <IconButton onClick={toggleLike} icon_class={`fa ${likes.includes(user.username) ? "fa-thumbs-o-up" : "fa-thumbs-up"}`} />

}

export default LikeCreate