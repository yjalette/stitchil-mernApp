import React, { useContext } from 'react';

import AuthContext from '../../context/Auth-context'
import LikeCreate from './LikeCreate';

const LikeSum = ({ likes, docId }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="likeSum d-flex align-items-center">
            <span className="likeSum__label label mr-2">{likes && likes.length || 0}</span>
            {user ?
                <LikeCreate docId={docId} />
                : <i className={`fa ${likes.includes(user.username) ? "fa-thumbs-o-up" : "fa-thumbs-up"}`} aria-hidden="true" />}
        </div>
    )
}

export default LikeSum


{/* <div className="likeSum d-flex align-items-center">
<span className="likeSum__label label mr-2">{likes && likes.length || 0}</span>
{user ?
    <LikeCreate docId={docId} />
    : <i className={`fa ${likes.includes(user.username) ? "fa-thumbs-o-up" : "fa-thumbs-up"}`} aria-hidden="true" />}
</div> */}