import React from 'react';
import { Media } from 'react-bootstrap';

import "./style.css";
import dateHelper from '../../helpers/dateHelper';

const MessageItem = ({ item, comp_class, children }) => (
    <Media className={`${comp_class} messageItem`}>
        {children}
        <Media.Body className="messageItem__body">
            <span className="messageItem__msg">{item.message}</span>
            <span className="messageItem__date time_date">{item.createdAt ? dateHelper(item.createdAt) : "just now"} </span>
        </Media.Body>
    </Media>
)

export default MessageItem
