import React, { useContext } from 'react'
import { Media } from 'react-bootstrap'
import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';

const MessageItem = ({ item }) => {
    const { user } = useContext(AuthContext);
    const logged_in_user = item.sender.username === user.username

    return (
        <div className="messageItem__wrapper" >
            <Media className={`messageItem ${logged_in_user && "sender"}`}>
                <Media.Body className="messageItem__body">
                    <span className="messageItem__msg">{item.message}</span>
                </Media.Body>
                <span className="messageItem__date time_date">{item.createdAt ? dateHelper(item.createdAt) : "just now"} </span>
            </Media>
        </div >
    )
}

export default MessageItem
